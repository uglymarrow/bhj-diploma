/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (!element) {
      throw new Error ("Ошибка!");
    } else {
      this.element = element;
    }

    this.registerEvents();
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    const incomeButton = document.querySelector('.create-income-button'),
          expenseButton = document.querySelector('.create-expense-button'),
          title = document.querySelector('.content-title');
    
    incomeButton.onclick = () => {
      const modal = App.getModal('newIncome');
      if (title.innerText !== "Название счёта") {
        modal.open();
      }
    }

    expenseButton.onclick = () => {
      const modal = App.getModal('newExpense');
      if (title.innerText !== "Название счёта") {
        modal.open();
      }
    }
  }
}
