// Configuration for displayed fields
const cardFields = ['name', 'location', 'date', 'method', 'language', 'grades'];
const detailFields = ['prerequisites', 'category', 'organizedBy', 'indonesiaLocalOrganizer', 'structure', 'awards', 'finalRoundInfo', 'compFee', 'website', 'samplePaper'];



function createCompetitionCard(competition) {
    const card = document.createElement('div');
    card.className = 'competition-card';

    // Set the logo path based on the competition ID or name
    const logoPath = `images/${competition.logo}`;

    let cardContent = `
        <div class="competition-header">
            <img src="${logoPath}" alt="${competition.name} Logo" class="competition-logo" onerror="this.style.display='none'"> <!-- Hide image if not found -->
            <h2 class="competition-title">${competition.name}</h2>
            ${competition.curated === "Yes" ? '<span class="curated">✓ Curated</span>' : ''}
        </div>
        <div class="competition-details">
            <div>${competition.location}</div>
            <div>${competition.date}</div>
        </div>
        <div class="competition-labels">
            <span class="label label-${competition.method}">${competition.method}</span>
            <span class="label label-language">${competition.language}</span>
            <span class="label label-grades">${competition.grades}</span>
        </div>
    `;

    if (competition.showRegister === "Yes") {
        cardContent += `<div class="register-container"><button class="register-btn" onclick="window.open('${competition.website}', '_blank')">Register</button></div>`;
    }

    cardContent += `
        <button class="show-more">Show More</button>
        <div class="additional-info">
            <h3>Competition Details</h3>
    `;

    detailFields.forEach(field => {
        if (competition[field]) {
            if (field === 'website' || field === 'samplePaper') {
                cardContent += `<p><strong>${formatFieldName(field)}:</strong> <a href="${competition[field]}" target="_blank">${competition[field]}</a></p>`;
            } else {
                cardContent += `<p><strong>${formatFieldName(field)}:</strong> ${formatContent(competition[field])}</p>`;
            }
        }
    });

    cardContent += `</div>`;
    card.innerHTML = cardContent;

    const showMoreBtn = card.querySelector('.show-more');
    const additionalInfo = card.querySelector('.additional-info');
    showMoreBtn.addEventListener('click', () => {
        if (additionalInfo.style.display === 'none' || additionalInfo.style.display === '') {
            additionalInfo.style.display = 'block';
            showMoreBtn.textContent = 'Show Less';
        } else {
            additionalInfo.style.display = 'none';
            showMoreBtn.textContent = 'Show More';
        }
    });

    return card;
}

function formatFieldName(field) {
    return field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
}

function formatContent(content) {
    // Check if the content contains any line breaks and add a <br> at the beginning if it does
    let formattedContent = content.includes('\n') ? '<br>' + content : content;

    // Replace double line breaks with a smaller gap
    formattedContent = formattedContent.replace(/\n\n/g, '<span class="small-gap"></span>');
    
    // Replace single line breaks with standard line breaks
    formattedContent = formattedContent.replace(/\n/g, '<br>');

    return formattedContent;
}


function renderCompetitions(filteredCompetitions) {
    const competitionList = document.getElementById('competitionList');
    competitionList.innerHTML = '';
    filteredCompetitions.forEach(competition => {
        competitionList.appendChild(createCompetitionCard(competition));
    });
}

function toggleFilters() {
    const dropdown = document.getElementById('filterDropdown');
    const toggleButton = document.getElementById('filterToggle');

    dropdown.classList.toggle('show');
    toggleButton.classList.toggle('open'); // Add 'open' class to the button for styling changes

    // Directly control styles to avoid lag
    dropdown.style.opacity = dropdown.classList.contains('show') ? '1' : '0';
    dropdown.style.transform = dropdown.classList.contains('show') ? 'translateY(0)' : 'translateY(-10px)';
}


function populateFilters() {
    const methodFilter = document.getElementById('methodFilter');
    const languageFilter = document.getElementById('languageFilter');
    const gradeFilter = document.getElementById('gradeFilter');

    const methods = new Set();
    const languages = new Set();
    const gradeOptions = [
        "Kindergarten", "Grade 1", "Grade 2", "Grade 3", "Grade 4",
        "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9",
        "Grade 10", "Grade 11", "Grade 12"
    ];

    competitions.forEach(competition => {
        competition.method.split('&').forEach(meth => methods.add(meth.trim()));
        competition.language.split('&').forEach(lang => languages.add(lang.trim()));
    });

    function populateSelect(element, values) {
        element.innerHTML = '<option value="">All</option>' +
            Array.from(values).map(value => `<option value="${value}">${value}</option>`).join('');
    }

    populateSelect(methodFilter, methods);
    populateSelect(languageFilter, languages);
    populateSelect(gradeFilter, gradeOptions);
}

function filterCompetitions() {
    const methodFilter = document.getElementById('methodFilter').value;
    const languageFilter = document.getElementById('languageFilter').value;
    const gradeFilter = document.getElementById('gradeFilter').value;
    const curatedFilter = document.getElementById('curatedFilter').checked;

    const filteredCompetitions = competitions.filter(competition => {
        const methodMatch = !methodFilter || competition.method.includes(methodFilter);
        const languageMatch = !languageFilter || competition.language.includes(languageFilter);
        const gradeMatch = !gradeFilter || isGradeInRange(competition.grades, gradeFilter);
        const curatedMatch = !curatedFilter || competition.curated === "Yes";
        return methodMatch && languageMatch && gradeMatch && curatedMatch;
    });

    renderCompetitions(filteredCompetitions);
}

function isGradeInRange(gradeRange, selectedGrade) {
    const gradeOrder = [
        "Kindergarten", "Grade 1", "Grade 2", "Grade 3", "Grade 4",
        "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9",
        "Grade 10", "Grade 11", "Grade 12"
    ];

    if (gradeRange.includes('-')) {
        const [startGrade, endGrade] = gradeRange.split('-').map(g => g.trim());
        const startIndex = gradeOrder.indexOf(startGrade);
        const endIndex = gradeOrder.indexOf(endGrade);
        const selectedIndex = gradeOrder.indexOf(selectedGrade);

        return selectedIndex >= startIndex && selectedIndex <= endIndex;
    }

    if (gradeRange.includes('& Below')) {
        const maxGrade = gradeRange.replace('& Below', '').trim();
        const maxIndex = gradeOrder.indexOf(maxGrade);
        const selectedIndex = gradeOrder.indexOf(selectedGrade);

        return selectedIndex <= maxIndex;
    }

    return gradeRange === selectedGrade;
}

document.addEventListener('DOMContentLoaded', () => {
    populateFilters();
    renderCompetitions(competitions);

    document.getElementById('filterToggle').addEventListener('click', toggleFilters);
    document.getElementById('methodFilter').addEventListener('change', filterCompetitions);
    document.getElementById('languageFilter').addEventListener('change', filterCompetitions);
    document.getElementById('gradeFilter').addEventListener('change', filterCompetitions);
    document.getElementById('curatedFilter').addEventListener('change', filterCompetitions);


    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        const filterContainer = document.querySelector('.filter-container');
        const filterDropdown = document.getElementById('filterDropdown');
        if (!filterContainer.contains(e.target) && filterDropdown.classList.contains('show')) {
            filterDropdown.classList.remove('show');
        }
    });
});
