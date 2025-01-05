let stateSet = new Set();

async function loadStateSuggestions() {
    try {
        const response = await fetch(`http://universities.hipolabs.com/search?country=India`);
        const data = await response.json();

        
        data.forEach(college => {
            if (college['state-province']) {
                stateSet.add(college['state-province']);
            }
        });

        updateStateSuggestions();
    } catch (error) {
        console.error('Error fetching state suggestions:', error);
        alert('Unable to load state suggestions.');
    }
}

function updateStateSuggestions() {
    const stateSuggestions = document.getElementById('stateSuggestions');
    stateSuggestions.innerHTML = ''; 

    stateSet.forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        stateSuggestions.appendChild(option);
    });
}

document.getElementById('getColleges').addEventListener('click', async () => {
    const stateProvince = document.getElementById('stateProvince').value.trim();
    const collegeList = document.getElementById('collegeList');
    collegeList.innerHTML = '';
    const resetButton = document.getElementById('resetButton');
    
    if (!stateProvince) {
        alert('Please enter a state or province!');
        return;
    }

    try {
        const response = await fetch(`http://universities.hipolabs.com/search?country=India`);
        const data = await response.json();

        
        const filteredColleges = data.filter(college =>
            college['state-province'] &&
            college['state-province'].toLowerCase().includes(stateProvince.toLowerCase()) 
        );

        if (filteredColleges.length === 0) {
            collegeList.innerHTML = '<li>No colleges found for this state/province.</li>';
        } else {
            filteredColleges.forEach(college => {
                const listItem = document.createElement('li');
                listItem.textContent = college.name;
                collegeList.appendChild(listItem);
            });
        }

        
        resetButton.classList.remove('hidden');
    } catch (error) {
        console.error('Error fetching colleges:', error);
        alert('Unable to fetch colleges. Please try again later.');
    }
});

document.getElementById('resetButton').addEventListener('click', () => {
    document.getElementById('stateProvince').value = '';
    document.getElementById('collegeList').innerHTML = '';
    document.getElementById('resetButton').classList.add('hidden');
});


window.onload = loadStateSuggestions;
