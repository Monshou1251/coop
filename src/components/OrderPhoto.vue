<template>
    <div class="order-photo">
        <div class="photo-wrapper" :class="{ editable: isEditMode }" @dragover.prevent="onDragOver"
            @drop.prevent="onDrop">

            <img :src="localPhotoUrl" alt="Фото детали" class="photo" @click="openPreview" />
            <input type="file" ref="fileInputRef" accept="image/*" @change="handleFileSelect" style="display: none" />
            <span v-if="isEditMode" class="drop-hint">Перетащите изображение или нажмите для выбора</span>
        </div>

        <div class="details">
            <div class="info-row">
                <div class="title">{{ title }}</div>
                <div class="description">{{ description }}</div>
            </div>
            <div class="price">{{ price }} ₽</div>
        </div>

        <div v-if="isPreviewOpen" class="modal" @click.self="closePreview">
            <div class="modal-content">
                <button class="close-btn" @click="closePreview">×</button>
                <img :src="localPhotoUrl" alt="Фото" class="modal-image" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
    title: String,
    price: [String, Number],
    description: String,
    photoUrl: String,
    isEditMode: Boolean
})

const localPhotoUrl = ref(props.photoUrl)

const fileInputRef = ref(null)

watch(() => props.photoUrl, (newVal) => {
    localPhotoUrl.value = newVal
})

const isPreviewOpen = ref(false)

function handleDrop(e) {
    const file = e.dataTransfer.files?.[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = () => {
            localPhotoUrl.value = reader.result
        }
        reader.readAsDataURL(file)
    }
}

function onDragOver(e) {
    if (!props.isEditMode) return
    e.preventDefault()
}

function onDrop(e) {
    if (!props.isEditMode) return
    handleDrop(e)
}


function openPreview() {
    if (props.isEditMode) {
        fileInputRef.value?.click()
    } else {
        isPreviewOpen.value = true
    }
}

function handleFileSelect(e) {
    const file = e.target.files?.[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = () => {
            localPhotoUrl.value = reader.result
        }
        reader.readAsDataURL(file)
    }
}


function closePreview() {
    isPreviewOpen.value = false
}

function onKeydown(e) {
    if (e.key === 'Escape') closePreview()
}
onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>


<style scoped>
.order-photo {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

}

.photo-wrapper {
    height: 240px;
    position: relative;
    border-radius: var(--border-radius);
    border: 1px solid var(--color-border);
    background: var(--color-background-soft);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    cursor: pointer;
}

.photo-wrapper.editable::after {
    content: '';
    position: absolute;
    background-color: #ffffff41;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 2px dashed var(--primary);
    border-radius: inherit;
    pointer-events: none;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.photo-wrapper.editable:hover::after {
    background-color: #e8f0ff65;

}

.photo {
    max-width: 100%;
    max-height: 100%;
    width: 100%;
    height: 100%;
    object-fit: cover;

}

.drop-hint {
    position: absolute;
    font-size: var(--font-md);
    color: var(--text-main);
    pointer-events: none;
}

.details {
    display: flex;
    padding-top: 10px;
}

.info-row {
    flex: 3;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.title {
    color: var(--text-invert);
    font-size: var(--font-lg);
    font-weight: var(--font-weight-semibold);
    line-height: 1.1;
}

.price {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    line-height: 1.1;
    color: var(--price-color);
    font-size: var(--font-lg);
    font-weight: var(--font-weight-semibold);
}

.description {
    color: var(--text-muted);
    font-size: var(--font-sm);
    line-height: 1.2;
}

.modal {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    max-width: 80%;
    max-height: 80%;
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    overflow: hidden;
}

.modal-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
}

.close-btn {
    position: absolute;
    top: 0.25rem;
    right: 0.75rem;
    background: transparent;
    color: white;
    border: none;
    font-size: 2rem;
    line-height: 1;
    cursor: pointer;
}

.close-btn:hover {
    color: #464545;
    transform: scale(1.05);
    transition: all 0.2s ease;
}
</style>
