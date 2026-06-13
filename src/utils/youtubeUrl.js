
export const getEmbedUrl = (url) => {

    if (!url) return null;

    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    
    const match = url.match(regExp);
    
    return match && match[2].length === 11 ? `https://youtube.com/embed/${match[2]}` : null;

};