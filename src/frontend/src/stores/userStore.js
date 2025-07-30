import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
    persist(
        (set, get) => ({
            // Authentication state
            isAuthenticated: false,
            user: null,
            token: null,

            // User profile
            profile: {
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                dateOfBirth: "",
                riskProfile: null,
                investmentGoals: [],
                preferences: {
                    notifications: true,
                    darkMode: false,
                    language: "en",
                },
            },

            // Onboarding state
            onboardingStep: 0,
            onboardingData: {},

            // Actions
            login: (userData, token) => {
                set({
                    isAuthenticated: true,
                    user: userData,
                    token: token,
                });
            },

            logout: () => {
                set({
                    isAuthenticated: false,
                    user: null,
                    token: null,
                    profile: {
                        firstName: "",
                        lastName: "",
                        email: "",
                        phone: "",
                        dateOfBirth: "",
                        riskProfile: null,
                        investmentGoals: [],
                        preferences: {
                            notifications: true,
                            darkMode: false,
                            language: "en",
                        },
                    },
                    onboardingStep: 0,
                    onboardingData: {},
                });
            },

            updateProfile: (profileData) => {
                set((state) => ({
                    profile: { ...state.profile, ...profileData },
                }));
            },

            updateOnboardingStep: (step) => {
                set({ onboardingStep: step });
            },

            updateOnboardingData: (data) => {
                set((state) => ({
                    onboardingData: { ...state.onboardingData, ...data },
                }));
            },

            setRiskProfile: (riskProfile) => {
                set((state) => ({
                    profile: { ...state.profile, riskProfile },
                }));
            },

            addInvestmentGoal: (goal) => {
                set((state) => ({
                    profile: {
                        ...state.profile,
                        investmentGoals: [...state.profile.investmentGoals, goal],
                    },
                }));
            },

            updatePreferences: (preferences) => {
                set((state) => ({
                    profile: {
                        ...state.profile,
                        preferences: { ...state.profile.preferences, ...preferences },
                    },
                }));
            },
        }),
        {
            name: "kronos-user-storage",
            partialize: (state) => ({
                isAuthenticated: state.isAuthenticated,
                user: state.user,
                token: state.token,
                profile: state.profile,
                onboardingStep: state.onboardingStep,
                onboardingData: state.onboardingData,
            }),
        }
    )
); 