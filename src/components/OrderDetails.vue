<template>
    <div class="order-details">
        <div class="top-details">
            <div class="section-title">Детали заказа</div>
            <v-text-field v-model="data.title" label="Название товара" :variant="isEditMode ? 'outlined' : 'plain'"
                density="compact" :readonly="!isEditMode" class="field" :class="{ readonly: !isEditMode }"
                :bg-color="isEditMode ? 'var(--bg-muted-blue)' : 'white'" :rules="[requiredRule]" />

            <v-textarea v-model="data.description" label="Описание" :variant="isEditMode ? 'outlined' : 'plain'"
                rows="1" :readonly="!isEditMode" class="field " :class="{ readonly: !isEditMode }" no-resize
                :bg-color="isEditMode ? 'var(--bg-muted-blue)' : 'white'" :rules="[requiredRule]" />
        </div>
        <div class="bottom-details">
            <v-row dense class="columns-wrapper">
                <v-col cols="12" md="6">
                    <div class="section-title">Изготовитель</div>
                    <v-text-field v-model="data.manufacturer.name" label="Название"
                        :variant="isEditMode ? 'outlined' : 'plain'" density="compact" :readonly="!isEditMode"
                        class="field" :class="{ readonly: !isEditMode }"
                        :bg-color="isEditMode ? 'var(--bg-muted-blue)' : 'white'" :rules="[requiredRule]" />
                    <v-text-field v-model="data.manufacturer.contact" label="Контакт"
                        :variant="isEditMode ? 'outlined' : 'plain'" density="compact" :readonly="!isEditMode"
                        class="field" :class="{ readonly: !isEditMode }"
                        :bg-color="isEditMode ? 'var(--bg-muted-blue)' : 'white'" />
                    <v-text-field v-model="data.manufacturer.phone" label="Телефон"
                        :variant="isEditMode ? 'outlined' : 'plain'" density="compact" :readonly="!isEditMode"
                        class="field" :class="{ readonly: !isEditMode }"
                        :bg-color="isEditMode ? 'var(--bg-muted-blue)' : 'white'" />
                    <v-text-field v-model="data.manufacturer.email" label="Email"
                        :variant="isEditMode ? 'outlined' : 'plain'" density="compact" :readonly="!isEditMode"
                        class="field" :class="{ readonly: !isEditMode }"
                        :bg-color="isEditMode ? 'var(--bg-muted-blue)' : 'white'" />
                </v-col>

                <v-col cols="12" md="6">
                    <div class="section-title">Организация</div>
                    <v-text-field v-model="data.organization.name" label="Название"
                        :variant="isEditMode ? 'outlined' : 'plain'" density="compact" :readonly="!isEditMode"
                        class="field" :class="{ readonly: !isEditMode }"
                        :bg-color="isEditMode ? 'var(--bg-muted-blue)' : 'white'" />
                    <v-text-field v-model="data.organization.inn" label="ИНН"
                        :variant="isEditMode ? 'outlined' : 'plain'" density="compact" :readonly="!isEditMode"
                        class="field" :class="{ readonly: !isEditMode }"
                        :bg-color="isEditMode ? 'var(--bg-muted-blue)' : 'white'" />
                    <v-text-field v-model="data.organization.address" label="Адрес"
                        :variant="isEditMode ? 'outlined' : 'plain'" density="compact" :readonly="!isEditMode"
                        class="field" :class="{ readonly: !isEditMode }"
                        :bg-color="isEditMode ? 'var(--bg-muted-blue)' : 'white'" />
                </v-col>
            </v-row>
        </div>
    </div>
</template>


<script setup>
import { computed } from 'vue'
import { useOrderStore } from '@/stores/orderStore'

const store = useOrderStore()
const isEditMode = computed(() => store.isEditMode)
const data = computed(() => store.isEditMode ? store.editableData : store.originalData)

const requiredRule = (v) => !!v || 'Обязательное поле'


</script>

<style scoped>
.field :deep(.v-field__input) {
    font-size: var(--font-sm);
}


.field.readonly :deep(.v-field__input) {
    color: var(--text-invert, #333);
    box-shadow: none !important;


}


.field.readonly :deep(.v-field__outline) {
    border-color: transparent !important;
}

.field.readonly :deep(.v-field) {
    box-shadow: none !important;
}

.top-details,
.bottom-details {
    border-bottom: 1px dashed #ddd;
    margin-bottom: 10px;
}

.section-title {
    font-weight: 600;
    font-size: var(--font-sm);
    margin-bottom: 1rem;
    /* color: var(--text-muted); */
    background-color: #dadada48;
    border-radius: 2px;
}

:deep(.v-messages__message) {
    position: absolute;
    top: -4px;
}
</style>
