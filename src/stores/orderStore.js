import { defineStore } from 'pinia'

function saveToStorage(data) {
  const { files, ...rest } = data
  const json = JSON.stringify(rest)
  localStorage.setItem('order-data', json)
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem('order-data')
    const parsed = raw ? JSON.parse(raw) : {}
    return {
      ...defaultData(),
      ...parsed,
      files: defaultData().files,
    }
  } catch (e) {
    return defaultData()
  }
}

function defaultData() {
  return {
    title: 'Чертёж корпуса',
    price: 4590,
    description: 'Корпус детали из алюминиевого сплава. Размер 200х120мм.',
    photoUrl:
      'https://images.pexels.com/photos/1911445/pexels-photo-1911445.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    files: [
      new File(['demo'], 'drawing.pdf', { type: 'application/pdf' }),
      new File(['demo'], 'notes.docx', {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      }),
    ],
    manufacturer: {
      name: 'ООО "МеталлПро"',
      contact: 'Иван Петров',
      phone: '+7 (900) 123-45-67',
      email: 'petrov@metalpro.ru',
    },
    organization: {
      name: 'ЗАО "Проект-Сервис"',
      inn: '7701234567',
      address: 'г. Москва, ул. Промышленная, д. 12',
    },
    status: 'Выполняется',
  }
}

export const useOrderStore = defineStore('order', {
  state: () => ({
    isEditMode: false,
    originalData: loadFromStorage(),

    editableData: null,
  }),

  actions: {
    enterEditMode() {
      this.editableData = this.copyData(this.originalData)
      this.isEditMode = true
    },
    cancelEdit() {
      this.editableData = this.copyData(this.originalData)
      this.isEditMode = false
    },
    saveChanges() {
      if (!this.validateRequiredFields()) {
        alert('Пожалуйста, заполните обязательные поля')
        return
      }

      this.originalData = this.copyData(this.editableData)
      saveToStorage(this.originalData)
      this.isEditMode = false
    },

    validateRequiredFields() {
      const d = this.editableData
      if (!d) return false

      return Boolean(
        d.title?.trim() &&
          d.description?.trim() &&
          d.manufacturer.name?.trim() &&
          d.organization.name?.trim(),
      )
    },

    updatePhotoUrl(url) {
      if (this.editableData) this.editableData.photoUrl = url
    },
    updateFiles(newFiles) {
      if (this.editableData) this.editableData.files = newFiles
    },
    submitOrder() {
      console.log('Отправка на сервер:', this.originalData)
      alert('Заказ отправлен!')
    },
    copyData(data) {
      return {
        title: data.title,
        price: data.price,
        description: data.description,
        photoUrl: data.photoUrl,
        files: [...data.files],
        manufacturer: {
          ...data.manufacturer,
        },
        organization: {
          ...data.organization,
        },
        status: data.status,
      }
    },
  },
})
