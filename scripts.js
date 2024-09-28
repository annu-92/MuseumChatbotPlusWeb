function loadChatbot() {
    
    var injectScript = document.createElement('script');
    injectScript.src = "https://cdn.botpress.cloud/webchat/v2.1/inject.js";
    injectScript.onload = function() {
        
        var configScript = document.createElement('script');
        configScript.src = "https://mediafiles.botpress.cloud/fd913839-f10f-4356-b9fb-75738273f08b/webchat/v2.1/config.js";
        configScript.defer = true;
        configScript.onload = function() {
            
            if (typeof initChatbot === 'function') {
                initChatbot(); 
            } else {
                console.log('Chatbot initialization function not found.');
            }
        };
        configScript.onerror = function() {
            console.error('Failed to load the chatbot config script.');
        };
        document.body.appendChild(configScript);
    };
    injectScript.onerror = function() {
        console.error('Failed to load the chatbot inject script.');
    };
    document.body.appendChild(injectScript);
}

window.onload = loadChatbot;

//langugae dropdown

  document.addEventListener('DOMContentLoaded', function() {
    const languageBtn = document.getElementById('languageBtn');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const languageSearch = document.getElementById('languageSearch');
    const languageList = document.getElementById('languageList');

    languageBtn.addEventListener('click', function(e) {
        e.preventDefault();
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });

    // Add this new event listener for the search input
    languageSearch.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const languages = languageList.getElementsByTagName('li');
        
        Array.from(languages).forEach(function(language) {
            const text = language.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                language.style.display = '';
            } else {
                language.style.display = 'none';
            }
        });
    });

    // Close the dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!languageBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.style.display = 'none';
        }
    });
});