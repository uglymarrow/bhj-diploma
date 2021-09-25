/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */
class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (!element) {
      throw new Error ("Ошибка!");
    } else {
      this.element = element;
    }

    this.update();
    this.registerEvents();

    this.currentAccounts;
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    const createAccount = document.querySelector('.create-account');
    createAccount.onclick = () => {
      const modal = App.getModal('createAccount');
      modal.open();
    }

    //ну не шмогла здесь сделать обработчик на счета, сделала в renderItem

  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    let current = User.current();
    if (current) {
      Account.list(current, (err, response) => {
        if (response && response.success === true) {
          this.clear();
          this.renderItem(response.data);
        }
      });
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const currentAccounts = Array.from(document.querySelectorAll('.account'));
    currentAccounts.forEach ((item) => {
      item.remove();
    })
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount(element) {
    const selectedItem = document.querySelector('.active');
    if (selectedItem) {
      selectedItem.classList.remove('active');
    }
    element.currentTarget.classList.add('active');
    const id = element.currentTarget.dataset.id;
    App.showPage('transactions', {account_id: id})
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item){
    return `
      <li class="account" data-id=${item.id}>
        <a href="#">
          <span>${item.name}</span> /
          <span>${item.sum}</span>
        </a>
      </li>
    `
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data){
    data.forEach((item) => {
      this.element.insertAdjacentHTML('beforeend', this.getAccountHTML(item));
    })

    let currentAccounts = Array.from(this.element.getElementsByClassName('account'));
    currentAccounts.forEach ((item) => {
     item.addEventListener('click', this.onSelectAccount);
    })
  }
}
