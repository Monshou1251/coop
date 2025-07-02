<template>
    <div class="order-files" :class="{ editable: isEditMode }" @dragover.prevent @drop.prevent="handleDrop">
        <h3 class="section-title">Вложенные файлы</h3>

        <div v-if="isEditMode" class="drop-zone">
            Перетащите файлы сюда или кликните для загрузки
            <input type="file" multiple class="file-input" @change="handleFileSelect" />
        </div>
        <div v-if="files.length">
            <ul class="file-list">
                <li v-for="(file, index) in files" :key="index" class="file-item">
                    <component :is="getFileIcon(file.name)" class="file-icon" />
                    <span class="file-name">{{ file.name || 'Неизвестный файл' }}</span>
                    <span class="file-size">{{ formatBytes(file.size) || 0 }}</span>
                    <button v-if="isEditMode" class="delete-btn" @click="removeFile(index)">
                        <component v-if="isEditMode" :is="Trash2Icon" class="delete-btn" @click="removeFile(index)" />
                    </button>
                </li>
            </ul>
        </div>

        <div v-else>
            <div v-if="!isEditMode" class="empty-placeholder">
                Файлы не добавлены
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useOrderStore } from '@/stores/orderStore'
import {
    FileTextIcon,
    FileEditIcon,
    FileSpreadsheetIcon,
    ImageIcon,
    PaperclipIcon,
    Trash2Icon,
} from 'lucide-vue-next'

const store = useOrderStore()

const isEditMode = computed(() => store.isEditMode)
const files = computed(() => store.editableData?.files ?? store.originalData.files)

function handleDrop(e) {
    if (!isEditMode.value) return
    const dropped = [...e.dataTransfer.files]
    store.updateFiles([...files.value, ...dropped])
}

function handleFileSelect(e) {
    if (!isEditMode.value) return
    const selected = [...e.target.files]
    store.updateFiles([...files.value, ...selected])
}

function removeFile(index) {
    const updated = [...files.value]
    updated.splice(index, 1)
    store.updateFiles(updated)
}

function formatBytes(bytes) {
    const sizes = ['B', 'KB', 'MB', 'GB']
    if (bytes === 0) return '0 B'
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return parseFloat((bytes / Math.pow(1024, i)).toFixed(1)) + ' ' + sizes[i]
}

function getFileIcon(filename) {
    const ext = filename.split('.').pop().toLowerCase()
    switch (ext) {
        case 'pdf':
            return FileTextIcon
        case 'doc':
        case 'docx':
            return FileEditIcon
        case 'xls':
        case 'xlsx':
            return FileSpreadsheetIcon
        case 'png':
        case 'jpg':
        case 'jpeg':
        case 'svg':
            return ImageIcon
        default:
            return PaperclipIcon
    }
}

</script>

<style scoped>
.order-files {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-top: 1rem;
}

.section-title {
    color: var(--text-invert);
    font-size: var(--font-md);
    font-weight: var(--font-weight-semibold);
}

.drop-zone {
    border: 2px dashed var(--primary);
    padding: 1rem;
    text-align: center;
    color: #666;
    border-radius: 6px;
    position: relative;
    cursor: pointer;
    font-size: var(--font-sm);
    transition: background-color 0.3s ease, color 0.3s ease;
}

.drop-zone:hover {
    background-color: #f0f6ff;
    color: var(--primary);
}

.file-input {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
}

.file-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-height: 150px;
    overflow-y: auto;
}

.file-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--bg-soft-white);
    padding: 0.5rem 0.75rem;
    border-radius: 6px;
    font-size: 0.9rem;
    color: var(--black-mute);
    opacity: 0.7;
    transition: background-color 0.3s ease, opacity 0.3s ease;
}

.file-item:hover {
    background-color: #e8f0ff86;
    opacity: 1;
    outline: none;
    cursor: pointer;
}

.file-icon {
    font-size: 1.2rem;
    width: 20px;
    text-align: center;
}

.file-name {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.file-size {
    color: #888;
    font-size: 0.8rem;
    margin-left: 0.5rem;
}

.delete-btn {
    background: none;
    border: none;
    color: #e11d48;
    font-size: 1.1rem;
    cursor: pointer;
    padding: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s ease, scale 0.2s ease;
}

.delete-btn:hover {
    color: #be123c;
    scale: 1.01;
}

.empty-placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    border-radius: 5px;
    background-color: #88888818;
    font-size: var(--font-sm);
    color: var(--text-muted);
}
</style>
