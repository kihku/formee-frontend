export const updateAvatar = (url: string) => {
    return {type: 'SET', payload: {value: url}}
}