/** Пользователь сервера ККМ. */
export class ServiceUser {
    /** Идентификатор пользователя. */
    Id?: string;

    /** Логин. */
    UserName: string = "";

    /** Полное имя. */
    FullName: string = "";

    /** ИНН. */
    Vatin: string = "";

    /** Роль: 0 — администратор, 1 — сотрудник. */
    Role: number = 0;

    /** Токен пользователя. */
    TokenId?: string;

    /** Пароль. Нужен при создании и смене пароля. */
    Password?: string;
}