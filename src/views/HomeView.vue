<template>
  <div class="order-view">
    <div class="order-grid">
      <aside class="left-column">
        <OrderPhoto :title="editableData.title" :price="editableData.price" :description="editableData.description"
          :photo-url="editableData.photoUrl" :is-edit-mode="isEditMode" />
        <OrderFiles />
      </aside>

      <main class="right-column">
        <OrderDetails />
        <StatusSteps />
      </main>
      <div class="toolbar">
        <template v-if="!isEditMode">
          <div class="btn-group">
            <div class="button">

              <BaseButton color="primary" variant="solid" @click="store.enterEditMode">
                Редактировать
              </BaseButton>
            </div>
            <div class="button">

              <BaseButton color="primary" variant="text" @click="goToChat">
                Перейти в чат
              </BaseButton>
            </div>
            <div class="button">
              <BaseButton color="primary" variant="text" @click="contactSupport">
                Связаться с поддержкой
              </BaseButton>

            </div>

          </div>
        </template>
        <template v-else>
          <div class="btn-group">
            <div class="button">

              <BaseButton variant="solid" @click="store.saveChanges">
                Сохранить
              </BaseButton>
            </div>
            <div class="button">

              <BaseButton variant="text" @click="store.cancelEdit">
                Отмена
              </BaseButton>
            </div>
          </div>
        </template>
      </div>
    </div>

  </div>
</template>



<script setup>
import { computed } from 'vue'
import { useOrderStore } from '@/stores/orderStore'

import OrderPhoto from '@/components/OrderPhoto.vue'
import OrderFiles from '@/components/OrderFiles.vue'
import OrderDetails from '@/components/OrderDetails.vue'
import StatusSteps from '@/components/StatusSteps.vue'
import BaseButton from '@/components/Buttons/BaseButton.vue'

const store = useOrderStore()

const isEditMode = computed(() => store.isEditMode)
const editableData = computed(() => store.editableData ?? store.originalData)


function goToChat() {
  // Например, переход по ссылке:
  window.open('/chat', '_blank')
}

function contactSupport() {
  console.log('kek')
  alert('Свяжитесь с поддержкой по support@example.com')
}
</script>



<style scoped>
.order-view {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  height: 100%;
  padding: 1rem;
  gap: 1rem;
  background-color: #fff;
}


.mode-toggle {
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.order-grid {
  flex: 1;
  display: flex;
  min-height: 0;
  /* overflow: hidden; */
  gap: 1.5rem;
  flex-direction: row;
  flex-wrap: wrap;
}

.left-column {
  flex: 3;
  border-right: 1px solid #ddd;
  padding-right: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-width: 300px;
}

.right-column {
  flex: 4;
  padding: 0.3rem;
  padding-left: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 300px;
}

.toolbar {
  /* background-color: red; */
  width: 100%;
  /* margin-top: 2rem; */
  display: flex;
  justify-content: center;
  border-top: 1px solid #ddd;
  padding-top: 30px;
}

.btn-group {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  flex-wrap: wrap;
}



@media (max-width: 1080px) {
  .order-grid {
    /* flex-direction: column; */
  }

  .left-column {
    padding-right: 0;
    border-right: none;
    border-bottom: 1px solid #ddd;
    padding-bottom: 1rem;
  }

  .right-column {
    padding-left: 0;
    padding-top: 1rem;
  }


  .btn-group {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
    width: 100%;
  }

  .button {
    width: 100%;
  }
}
</style>