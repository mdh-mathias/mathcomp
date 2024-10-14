// Configuration for displayed fields
const cardFields = ['name', 'location', 'date', 'method', 'language', 'grades'];
const detailFields = ['prerequisites', 'category', 'organizedBy', 'indonesiaLocalOrganizer', 'structure', 'awards', 'finalRoundInfo', 'compFee', 'website', 'samplePaper'];

function createCompetitionCard(competition) {
    const card = document.createElement('div');
    card.className = 'competition-card';
    
    let cardContent = `
        <div class="competition-header">
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
    return content.includes('\n') ? '<br>' + content.replace(/\n/g, '<br>') : content;
}

function renderCompetitions(filteredCompetitions) {
    const competitionList = document.getElementById('competitionList');
    competitionList.innerHTML = '';
    filteredCompetitions.forEach(competition => {
        competitionList.appendChild(createCompetitionCard(competition));
    });
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
        //methods.add(competition.method);
        competition.method.split('&').forEach(meth => methods.add(meth.trim()));
        competition.language.split('&').forEach(lang => languages.add(lang.trim()));
        //grades.add(competition.grades);
    });

    [
        { element: methodFilter, values: methods },
        { element: languageFilter, values: languages }
        //,
        //{ element: gradeFilter, values: grades }
    ].forEach(({ element, values }) => {
        element.innerHTML = '<option value="">All</option>' + 
            Array.from(values).sort().map(value => `<option value="${value}">${value}</option>`).join('');
    });
    
    gradeFilter.innerHTML = '<option value="">All</option>' + 
        gradeOptions.map(grade => `<option value="${grade}">${grade}</option>`).join('');
}

function filterCompetitions() {
    const methodFilter = document.getElementById('methodFilter').value;
    const languageFilter = document.getElementById('languageFilter').value;
    const gradeFilter = document.getElementById('gradeFilter').value;

    const filteredCompetitions = competitions.filter(competition => {
        //const methodMatch = !methodFilter || competition.method === methodFilter;
        const methodMatch = !methodFilter || competition.method.includes(methodFilter);
        const languageMatch = !languageFilter || competition.language.includes(languageFilter);
        const gradeMatch = !gradeFilter || isGradeInRange(competition.grades, gradeFilter);
        return methodMatch && languageMatch && gradeMatch;
    });

    renderCompetitions(filteredCompetitions);
}

// Helper function to check if a specific grade falls within the competition's grade range
function isGradeInRange(gradeRange, selectedGrade) {
    const gradeOrder = [
        "Kindergarten", "Grade 1", "Grade 2", "Grade 3", "Grade 4", 
        "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9", 
        "Grade 10", "Grade 11", "Grade 12"
    ];

    // Handle ranges like "Grade 1 - Grade 6"
    if (gradeRange.includes('-')) {
        const [startGrade, endGrade] = gradeRange.split('-').map(g => g.trim());
        const startIndex = gradeOrder.indexOf(startGrade);
        const endIndex = gradeOrder.indexOf(endGrade);
        const selectedIndex = gradeOrder.indexOf(selectedGrade);

        return selectedIndex >= startIndex && selectedIndex <= endIndex;
    }

    // Handle descriptions like "Grade 10 & Below"
    if (gradeRange.includes('& Below')) {
        const maxGrade = gradeRange.replace('& Below', '').trim();
        const maxIndex = gradeOrder.indexOf(maxGrade);
        const selectedIndex = gradeOrder.indexOf(selectedGrade);

        return selectedIndex <= maxIndex;
    }

    // If no range or special case, match exact grade
    return gradeRange === selectedGrade;
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('methodFilter').addEventListener('change', filterCompetitions);
    document.getElementById('languageFilter').addEventListener('change', filterCompetitions);
    document.getElementById('gradeFilter').addEventListener('change', filterCompetitions);

    populateFilters();
    renderCompetitions(competitions);
});