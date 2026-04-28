/**
 * Formate une date de AAAA-MM-JJ vers JJ/MM/AAAA
 * @param {string} dateStr - La date au format ISO (AAAA-MM-JJ)
 * @returns {string} - La date formatée ou une chaîne vide
 */
export const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const parts = dateStr.split('-');
    if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
};
