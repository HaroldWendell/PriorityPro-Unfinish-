// Edit button
const allowanceLabel = document.getElementById('allowanceLabel');
const editIcon = document.getElementById('editIcon');

function handleEditIconClick() {
    const newName = prompt('Enter a new name:');
    if (newName !== null && newName.trim() !== '') {
      allowanceLabel.textContent = newName;
    }
  }
  
editIcon.addEventListener('click', handleEditIconClick);

// Adding and deleting Expenses Allocation
const allocationContainer = document.getElementById('allocationContainer');
const deleteIcons = document.getElementsByClassName('deleteIcon');

function handleDeleteIconClick(event) {
  const allocationTabToDelete = event.target.closest('.allocationTab');
  if (allocationTabToDelete) {
    allocationTabToDelete.remove();
  }
}

document.getElementById('addExpense').addEventListener('click', () => {
  const name = prompt('Enter a name for the allocation:');
  if (name === null || name.trim() === '') {
    return;
  }
  const originalAllocationTab = document.querySelector('.allocationTab');
  const clonedAllocationTab = originalAllocationTab.cloneNode(true);
  const nameElement = clonedAllocationTab.querySelector('i');
  nameElement.textContent = name;
  const deleteIcon = clonedAllocationTab.querySelector('.deleteIcon');
  deleteIcon.addEventListener('click', handleDeleteIconClick);
  clonedAllocationTab.style.display = 'block';
  allocationContainer.appendChild(clonedAllocationTab);
});