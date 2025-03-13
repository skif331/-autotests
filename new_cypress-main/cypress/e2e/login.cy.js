describe('Проверка авторизации', function () {

    it('Верный пароль и верный логин', function () {
         cy.visit('https://login.qa.studio/'); // зашли на сайт 
         cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // проверяю цвет кнопки воссстановить пароль 
         cy.get('#mail').type('USER_LOGIN'); // ввели верный логин
         cy.get('#pass').type('iLoveqastudio1'); // ввели верный пароль
         cy.get('#loginButton').click(); // нажал войти 
         cy.get('#messageHeader').contains('Авторизация прошла успешно'); // проверяю, что после авт вижу текст
         cy.get('#messageHeader').should('be.visible'); // текст виден пользователю
         cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // крестик виден пользователю
    })
    
    it('Верный логин и неверный пароль', function () {
        cy.visit('/');
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // проверяю цвет кнопки воссстановить пароль 
        cy.get('#mail').type('USER_LOGIN'); // ввели верный логин
        cy.get('#pass').type('USER_PASSWORD'); // ввели не верный пароль
        cy.get('#loginButton').click(); // нажал войти
        cy.get('#messageHeader').should('be.visible'); // текст виден пользователю
        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // проверяю, что после авт вижу текст
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // крестик виден пользователю

        
   })

     it('Верный пароль и неверный логин', function () {
      cy.visit('https://login.qa.studio/'); // зашли на сайт 
      cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // проверяю цвет кнопки воссстановить пароль 
      cy.get('#mail').type('USER_LOGIN'); // ввели  не верный логин
      cy.get('#pass').type('USER_PASSWORD'); // ввели верный пароль
      cy.get('#loginButton').click(); // нажал войти 
      cy.get('#messageHeader').contains('Такого логина или пароля нет'); // проверяю, что после авт вижу текст
      cy.get('#messageHeader').should('be.visible'); // текст виден пользователю
      cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // крестик виден пользователю
})

it('Валидация на наличие @', function () {
     cy.visit('/');
     cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // проверяю цвет кнопки воссстановить пароль
     cy.get('#mail').type('USER_LOGIN'); // ввели почту без @
     cy.get('#pass').type('USER_PASSWORD'); // ввели пароль
     cy.get('#loginButton').click(); // нажал войти
     cy.get('#messageHeader').should('be.visible');  // текст виден пользователю
     cy.get('#messageHeader').contains('Нужно исправить проблему валидации');  // проверяю, что после авт вижу текст
     cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // крестик виден пользователю
})
it('Восстановление пароля', function () {
     cy.visit('/');
     cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // проверяю цвет кнопки воссстановить пароль
     cy.get('#forgotEmailButton').click(); // нажал забыли пароль 
     cy.get('#mailForgot').type('USER_LOGIN'); // ввожу почту 
     cy.get('#restoreEmailButton').click(); // сменить почту 
     cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail'); // проверяю, что после авт вижу текст
     cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // крестик виден пользователю
 })
})

describe('Покупка аватара', function () {                                // название набора тестов
     it('e2e тест на покупку нового аватара для тренера', function () {   // название теста
          cy.visit('https://pokemonbattle.ru/');                          // переходим на сайт https://pokemonbattle.ru/
          cy.get('input[type="email"]').type('USER_LOGIN');                   // вводим логин
          cy.get('input[type="password"]').type('USER_PASSWORD');               // вводим пароль
          cy.get('button[type="submit"]').click();                               // нажимаем кнопку Подтвердить
          cy.wait(2000);
          cy.get('.header__container > .header__id').click({ force: true }); // Клик в шапке на аву тренера
          cy.get('[href="/shop"]').click();                               // нажимаем кнопку Магазин
          cy.get('.available > button').first().click({ force: true });   // кликаем Купить у первого доступного аватара
          cy.get('.credit').type('4620869113632996');                     // вводим номер карты
          cy.get('.k_input_ccv').type('125');                             // вводим CVV карты
          cy.get('.k_input_date').type('1225');                           // вводим срок действия карты
          cy.get('.k_input_name').type('NAME');                           // вводим имя владельца действия карты
          cy.get('.pay-btn').click();                                     // нажимаем кнопку Оплатить
          cy.get('#cardnumber').type('56456');                            // вводим код подтверждения СМС
          cy.get('.payment__submit-button').click();                      // нажимаем кнопку Отправить
          cy.contains('Покупка прошла успешно').should('be.visible');     // проверяем наличие и видимость сообщения о успешной покупке
      });
  });