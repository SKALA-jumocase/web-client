import { ref, computed } from 'vue';

export interface UserData {
  age: number;
  sex: 'male' | 'female';
  isPrivacyAgreed: boolean;
}

const userData = ref<UserData | null>(null);

// Initialize from sessionStorage
if (typeof window !== 'undefined') {
  const stored = sessionStorage.getItem('userData');
  if (stored) {
    try {
      userData.value = JSON.parse(stored);
    } catch (error) {
      console.error('Failed to parse stored user data:', error);
    }
  }
}

export function useUser() {
  const setUserData = (data: UserData) => {
    userData.value = data;
    // Store in sessionStorage for persistence
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('userData', JSON.stringify(data));
    }
  };

  const clearUserData = () => {
    userData.value = null;
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('userData');
    }
  };

  const isUserDataComplete = computed(() => {
    return Boolean(
      userData.value?.isPrivacyAgreed &&
      userData.value?.age &&
      userData.value?.sex
    );
  });

  return {
    userData,
    setUserData,
    clearUserData,
    isUserDataComplete,
  };
}