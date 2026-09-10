import { ref } from 'vue'

// Singletons para compartir el mismo Blob en toda la app
let _blobUrl = null
const _status = ref('idle')     // 'idle' | 'loading' | 'loaded' | 'error'
const _progress = ref(0)

export function useGlbPreload(src = '/models/house_aventa.glb') {
    const glbUrl  = ref(_blobUrl)
    const status  = _status
    const progress = _progress

    async function preload() {
        if (_blobUrl || _status.value === 'loading') return
        _status.value = 'loading'
        try {
            const res = await fetch(src, { cache: 'no-store' }) // descarga una vez
            const total = Number(res.headers.get('content-length')) || 0

            if (res.body && total > 0) {
                const reader = res.body.getReader()
                let loaded = 0
                const chunks = []
                while (true) {
                    const { done, value } = await reader.read()
                    if (done) break
                    chunks.push(value)
                    loaded += value.byteLength
                    _progress.value = Math.round((loaded / total) * 100)
                }
                const blob = new Blob(chunks, { type: 'model/gltf-binary' })
                _blobUrl = URL.createObjectURL(blob)
            } else {
                const blob = await res.blob()
                _progress.value = 100
                _blobUrl = URL.createObjectURL(blob)
            }

            glbUrl.value = _blobUrl
            _status.value = 'loaded'
        } catch (e) {
            console.error('[useGlbPreload] ', e)
            _status.value = 'error'
        }
    }

    function revoke() {
        if (_blobUrl) {
            URL.revokeObjectURL(_blobUrl)
            _blobUrl = null
        }
        _status.value = 'idle'
        _progress.value = 0
        glbUrl.value = null
    }

    return { glbUrl, status, progress, preload, revoke }
}
