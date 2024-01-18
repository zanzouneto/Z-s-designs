document.addEventListener('DOMContentLoaded', function () {
    const gridContainer = document.querySelector('.project-div-container');
    const loadMoreBtn = document.getElementById('next-btn'); 
    const currentPageSpan = document.getElementById('current-page');
    const projectDivs = gridContainer.querySelectorAll('.project-div-main');
    let totalItems = projectDivs.length;
    let currentPage = 1;
    const itemsPerPage = 12; 
    let totalPages = Math.ceil(totalItems / itemsPerPage);

    function renderGrid(initialLoad = false) {
        if (initialLoad) {
            gridContainer.innerHTML = ''; 
        }
        const start = (currentPage - 1) * itemsPerPage;
        const end = Math.min(start + itemsPerPage, totalItems);
        for (let i = start; i < end; i++) {
            if (projectDivs[i]) {
                const div = document.createElement('div');
                div.className = 'project-div-main';
                div.innerHTML = projectDivs[i].innerHTML;
                gridContainer.appendChild(div);
            }
        }
        if (currentPage >= totalPages) {
            loadMoreBtn.style.display = 'none'; 
        }
    }

    loadMoreBtn.addEventListener('click', () => {
        currentPage++;
        renderGrid();
        currentPageSpan.textContent = currentPage; 
        console.log('currentPage:', currentPage);
    });

    renderGrid(true);
});
