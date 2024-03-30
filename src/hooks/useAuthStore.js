import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { HttpGet } from '~/pages/API/useAuth/auth.api';

const useAuthStore = create(
    devtools(
        immer((set, get) => ({
            user: null,
            setUser: (user) =>
                set((state) => {
                    state.user = user;
                }),
            isFetchedUser: false,
            isLoading: false,
            logOut: () => {
                set((state) => {
                    state.user = null;
                });
                sessionStorage.removeItem('authToken');
            },
            fetchUser: async () => {
                console.log('da vao fetch user')
                if (!sessionStorage.getItem('accesstoken')) {
                    set((state) => {
                        state.isFetchedUser = true;
                        
                    });
                    return;
                }

                set((state) => {
                    state.isLoading = true;
                });

                try {
                    const response =  await HttpGet(`/auth/me`);
                    
                    console.log('chek usse iio auth',response)
                    set((state) => {
                        state.user = response;
                    });
                } catch (e) {
                    console.log('loi roi',e)
                    sessionStorage.removeItem('authToken');
                } finally {
                    console.log('chac chan vao dayu')
                    set((state) => {
                        state.isLoading = false;
                        state.isFetchedUser = true;
                    });
                }
            },
            getAvatar: () => {
                const user = get().user;
                return user?.profile?.avatar;
            },
        })),
    ),
);

export default useAuthStore;
