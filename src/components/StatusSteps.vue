<template>
    <div class="status-steps-main">
        <div class="section-title">Статус</div>
        <div class="status-steps">

            <div v-for="(step, index) in steps" :key="step.label" class="step">
                <div class="icon-wrapper" :class="{ active: index <= currentStepIndex, clickable: isEditMode }"
                    @click="handleClick(index)">
                    <component :is="step.icon" class="icon" />
                </div>
                <div class="label" :class="{ active: index <= currentStepIndex }">
                    {{ step.label }}
                </div>

                <div v-if="index < steps.length - 1" class="line" :class="{ active: index < currentStepIndex }"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useOrderStore } from '@/stores/orderStore'
import {
    FileTextIcon,
    UploadIcon,
    LoaderIcon,
    CheckCircleIcon,
} from 'lucide-vue-next'

const steps = [
    { label: 'Черновик', icon: FileTextIcon },
    { label: 'Опубликован', icon: UploadIcon },
    { label: 'Выполняется', icon: LoaderIcon },
    { label: 'Завершён', icon: CheckCircleIcon },
]

const store = useOrderStore()
const isEditMode = computed(() => store.isEditMode)

const data = computed(() =>
    store.isEditMode ? store.editableData : store.originalData
)

const currentStepIndex = computed(() =>
    steps.findIndex((step) => step.label === data.value.status)
)

function handleClick(index) {
    if (!isEditMode.value) return
    data.value.status = steps[index].label
}
</script>

<style scoped>
.status-steps {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin: 1.5rem 0;
    gap: 1rem;
    position: relative;
}

.step {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    position: relative;
}

.icon-wrapper {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid #ccc;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ccc;
    z-index: 1;
    transition: all 0.3s;
}

.icon-wrapper.active {
    background-color: #3b82f6;
    border-color: #3b82f6;
    color: white;
}

.icon-wrapper.clickable {
    cursor: pointer;
}

.icon {
    width: 20px;
    height: 20px;
}

.label {
    margin-top: 0.5rem;
    font-size: 0.85rem;
    text-align: center;
    color: #999;
    transition: color 0.3s;
}

.label.active {
    color: #222;
    font-weight: 500;
}

.line {
    position: absolute;
    top: 18px;
    right: -50%;
    height: 2px;
    width: 100%;
    background-color: #ccc;
    z-index: 0;
}

.line.active {
    background-color: #3b82f6;
}

.section-title {
    font-weight: 600;
    font-size: var(--font-sm);
    margin-bottom: 1rem;
    background-color: #dadada48;
    border-radius: 2px;
}
</style>
