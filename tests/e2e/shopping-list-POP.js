export default class TodoMVCPage {

  constructor(page) {
    this.page = page;
    this.inputForNewItem = page.getByPlaceholder('Enter a new item');
    this.addButton = page.getByRole('button', { name: 'Add Item' });
  }

  async goto() {
    await this.page.goto('/');
  }

  getTaskItemByName(taskName) {
    return this.page.getByRole('listitem').filter({ hasText: taskName });
  }

  async addItem(text) {
    await this.inputForNewItem.fill(text);
    await this.addButton.click();
  }

  async deleteItem(taskName) {
    const item = this.getTaskItemByName(taskName);
    const deleteButton = item.getByRole('button', { name: 'Delete' });
    await deleteButton.click();
  }

}
