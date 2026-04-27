function toggleDropdown() {
  document.getElementById("dropdownMenu").classList.toggle("show");
}

// Close dropdown when clicking outside
window.onclick = function(event) {
  if (!event.target.matches('.dropdown-btn')) {
    let dropdown = document.getElementById("dropdownMenu");
    if (dropdown.classList.contains('show')) {
      dropdown.classList.remove('show');
    }
  }
};