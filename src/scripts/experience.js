
document.addEventListener('DOMContentLoaded', () => {
    const startDate = new Date('2022-04-01');
    const currentDate = new Date();

    // Calculate difference in months
    let months = (currentDate.getFullYear() - startDate.getFullYear()) * 12;
    months -= startDate.getMonth();
    months += currentDate.getMonth();

    // Calculate years and remaining months
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    // Format the string
    let durationString = '';

    if (years > 0) {
        durationString += `${years} año${years !== 1 ? 's' : ''}`;
    }

    if (remainingMonths > 0) {
        if (years > 0) durationString += ' y ';
        durationString += `${remainingMonths} mes${remainingMonths !== 1 ? 'es' : ''}`;
    }

    // Find the container and update it
    const durationContainer = document.getElementById('experience-duration');
    if (durationContainer) {
        durationContainer.textContent = durationString;
        durationContainer.style.color = 'var(--primary)';
        durationContainer.style.fontWeight = '600';
        durationContainer.style.marginBottom = '1rem';
        durationContainer.style.display = 'block';
    }

    // Also update the typing text if it exists, though it might be handled by another script
    // This is just for the specific requested location
});
