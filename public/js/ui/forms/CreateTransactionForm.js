/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);

    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    let current = User.current();
    if (current) {
      Account.list(current, (err, response) => {
        if (response && response.success === true) {
          const boxInc = document.getElementById('income-accounts-list');
          const boxExp = document.getElementById('expense-accounts-list');
          boxInc.innerHTML = '';
          boxExp.innerHTML = '';
          response.data.forEach((item) => {
            boxInc.innerHTML += `<option value="${item.id}">${item.name}</option>`;
            boxExp.innerHTML += `<option value="${item.id}">${item.name}</option>`;
          })
        }
      });
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response.success === true) {
        App.update();
        if (data.type === 'income') {
          const form = App.getForm('createIncome');
          form.element.reset();
          const modal = App.getModal('newIncome');
          modal.close();
        } else {
          const form = App.getForm('createExpense');
          form.element.reset();
          const modal = App.getModal('newExpense');
          modal.close();
        }
      }
    })
  }
}