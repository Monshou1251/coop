<template>
    <button :class="[
        'base-button',
        `base-button--${color}`,
        `base-button--${variant}`,
        { 'w-full': fullWidth }
    ]">
        <slot />
    </button>
</template>

<script setup>
defineProps({
    color: { type: String, default: 'primary' },
    variant: { type: String, default: 'solid' },
    fullWidth: Boolean,
})
</script>

<style scoped>
.base-button {
    font-weight: 500;
    font-size: 0.875rem;
    padding: 0.4rem 0.85rem;
    border-radius: 6px;
    transition: all 0.2s ease;
    cursor: pointer;
    border: 2px solid transparent;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    user-select: none;
    width: 100%;
}

.base-button--solid {
    color: white;
}

.base-button--outline {
    background-color: transparent;
}

.base-button--text {
    background: none;
    border: none;
}

.base-button--primary.base-button--solid {
    background-color: #2563eb;
}

.base-button--primary.base-button--outline {
    color: #2563eb;
    border-color: #2563eb;
}

.base-button--primary.base-button--text {
    color: #2563eb;
}

.base-button--secondary.base-button--solid {
    background-color: #6b7280;
}

.base-button--secondary.base-button--outline {
    color: #6b7280;
    border-color: #6b7280;
}

.base-button--secondary.base-button--text {
    color: #6b7280;
}

.base-button--error.base-button--solid {
    background-color: #dc2626;
}

.base-button--error.base-button--outline {
    color: #dc2626;
    border-color: #dc2626;
}

.base-button--error.base-button--text {
    color: #dc2626;
}

.base-button--success.base-button--solid {
    background-color: #16a34a;
}

.base-button--success.base-button--outline {
    color: #16a34a;
    border-color: #16a34a;
}

.base-button--success.base-button--text {
    color: #16a34a;
}

.base-button--solid:hover {
    filter: brightness(1.1);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.base-button--outline:hover {
    background-color: rgba(0, 0, 0, 0.03);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.base-button--text:hover {
    background-color: rgba(0, 0, 0, 0.04);
}

/* --- Active state --- */
.base-button:active {
    transform: scale(0.98);
    box-shadow: none;
}
</style>
