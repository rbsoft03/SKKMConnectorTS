/** Настройки прокси-сервера. */
export class ProxyConfig {
    /**true — использовать прокси для общих запросов сервера ККМ. */
    IsUseProxy: boolean = false;
    /**true— использовать прокси для службы печати. */
    IsUseProxyService: boolean = false;
    /**true — использовать прокси для запросов маркировки (ИСМ и связанные). */
    IsUseProxyMarking: boolean = false;
    /**IP-адрес или DNS-имя прокси-сервера. */
    IpAddress: string = "";
    /**TCP-порт прокси-сервера. */
    Port: number = 0;
    /**Логин для авторизации на прокси (если требуется). */
    Name: string = "";
    /**Пароль для авторизации на прокси (если требуется). */
    Password: string = "";
}