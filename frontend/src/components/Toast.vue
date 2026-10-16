<template>
  <div class="toast-container position-fixed top-0 end-0 p-4">
    <div
      v-if="visible"
      class="custom-toast shadow-lg"
      :class="`toast-${type}`"
    >
      <div class="toast-icon">
        <i :class="icon"></i>
      </div>

      <div class="toast-content">
        <div class="toast-title">
          {{ title }}
        </div>

        <div class="toast-message">
          {{ message }}
        </div>
      </div>

      <button
        type="button"
        class="toast-close"
        @click="close"
      >
        <i class="bi bi-x-lg"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      title: "",
      message: "",
      type: "success",
      icon: "bi bi-check-circle-fill",
      timer: null,
    };
  },

  methods: {
    show(message, type = "success", title = null) {
      clearTimeout(this.timer);

      this.message = message;
      this.type = type;

      if (title) {
        this.title = title;
      } else {
        const titles = {
          success: "Başarılı",
          danger: "Hata",
          warning: "Dikkat",
          info: "Bilgi",
        };

        this.title = titles[type] || "Bildirim";
      }

      const icons = {
        success: "bi bi-check-circle-fill",
        danger: "bi bi-x-circle-fill",
        warning: "bi bi-exclamation-triangle-fill",
        info: "bi bi-info-circle-fill",
      };

      this.icon = icons[type] || icons.info;

      this.visible = true;

      this.timer = setTimeout(() => {
        this.close();
      }, 3500);
    },

    close() {
      this.visible = false;
      clearTimeout(this.timer);
    },
  },
};
</script>

<style scoped>
.toast-container {
  z-index: 99999;
}

.custom-toast {
  width: 380px;
  min-height: 80px;

  display: flex;
  align-items: center;
  gap: 15px;

  padding: 16px 18px;

  background: white;
  border-radius: 14px;

  border-left: 5px solid;

  animation: toastIn 0.35s ease;
}

.toast-success {
  border-color: #198754;
}

.toast-danger {
  border-color: #dc3545;
}

.toast-warning {
  border-color: #ffc107;
}

.toast-info {
  border-color: #0d6efd;
}

.toast-icon {
  font-size: 27px;
  flex-shrink: 0;
}

.toast-success .toast-icon {
  color: #198754;
}

.toast-danger .toast-icon {
  color: #dc3545;
}

.toast-warning .toast-icon {
  color: #ffc107;
}

.toast-info .toast-icon {
  color: #0d6efd;
}

.toast-content {
  flex: 1;
}

.toast-title {
  font-size: 15px;
  font-weight: 700;
  color: #212529;
  margin-bottom: 3px;
}

.toast-message {
  font-size: 14px;
  color: #6c757d;
  line-height: 1.4;
}

.toast-close {
  border: 0;
  background: transparent;
  color: #999;
  font-size: 13px;
  cursor: pointer;
  padding: 5px;
}

.toast-close:hover {
  color: #222;
}

@keyframes toastIn {
  from {
    opacity: 0;
    transform: translateX(100px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 576px) {
  .toast-container {
    left: 0;
    right: 0;
    padding: 15px !important;
  }

  .custom-toast {
    width: 100%;
  }
}
</style>