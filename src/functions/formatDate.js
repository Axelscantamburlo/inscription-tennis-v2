
export function formatDate(timestamp) {
    const date = timestamp.toDate();
    const options = { weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric' };
    return new Intl.DateTimeFormat('fr-FR', options).format(date) || 'Pas de date';
}

