import { BrowserService } from "./browser_service";

// eslint-disable-next-line max-len
const app1Icon =  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAACOklEQVRYhdWXP2gTcRTHP+9XSbQJRFNRsAQRCfgn2oBo3FxcFMFFQewiBXUqFAcHl7q4OAgKLs52EgehCoI4CGKFIhFqlQaMJEQRJTHlIk0g9xwuTYpJewcXc/iW49373ft+fl9+9+AntEJzuTCR0FWQi0AKiNDfqAELqMzwe+WBJJN1AAHQYnGUIX0KjPVZdJ3QLE1zRhKJkjg7D78dnPgaiFrjuHFsH7Q4gKQZ3nzZgIwPXnw1dNwABwLTF1IGiAYGAFEToDgAm3x3KP+geXcalitdJTl0FDNxzR+AvnsN9ZUeFUFSR9DC557iALow79begwOje6BR76UPW4ZB1UmTBzHnJrBfzqLzr6DZbNf8AZTy6zpALN5JI1HYsQtz4Qp64hT27euurb0BuDmwGq3N6qf36PPHnsS9AXh0QD9mse/cQIt5z+LeANwc2NqCaNS7xWMjru1FvxbcT4pLaH4Jqj1+w917Ydv2Db/9/weR5pew7033LsbiDN287w/AfvYIrGp3QQzm5Fn4VXbyUBgZ2Yl+K3TWVMtu7d0BzOnzGy/4knN49qcxl6bav6G23vsGcHWgnbce+8YgFkf7NYi8OkDNgp/fsV88cUaxx/DvgDhb19wHmrem/loj/gHcHBDUmYg9DpwcPuYK0JdB5CcCH0QGsALUXzbAYmDyyqJB5WFgAMhM62oWmgNJD1Zcs1SszJrLqT07OIjO5dQASCJRomJlUJlEmePfHEwL0TeoTFKxMpJIlAD+AKsi08lrXgcQAAAAAElFTkSuQmCC";

// eslint-disable-next-line max-len
const app2Icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAACGUlEQVRYhcWXz2sTQRiGn2+a5peBqohRii0UiocWDXrQgx695SYqNDdR82f4XwjmbD0oBS8eFMWrgmCkJighgoUURXNJ1yYTNzsekpBoN+5isrvv8Zv55nl5Z3d2RxjImFoCLUVENoB14BCz1U/gA8ZskjAlkVUNIABm/9Mic7GnwNkZQyepTM/OS/p0Q4ypJeiqNyHCRybizkWFlmIEcIAceu62QqQQAbwvcQpidH0PyERkwVIRwgEyKkI4ADHPGY0iWC9cOrOw/BhiiwEbsF661+1v0H4P6Qy03wLm4ByVhPSlKQ0MF1551U+iWYLe99GYSkN8ZYKBhOfqPgwMNL8ER27CwgbsXAX9sV939qH7eYKBpOcW+TeAA78a0LwH3doYJKwEdq5DZxuM/ZevoBOIZQcP3DuXsZNTJyBG1106x2TvQrvsAj8BqXOeAC/5OIgm+fu3b7/y3oIv1/pb4KalR5A6H7CBITx5BnT1z4fQ/gr2D2g9AZyDvWoBDt+Y0sBQy1uj17C1BaY3WOEYHL3le5n/N4CC+VNw/C7oCnQq/XJoCdi7sPcMmvfHjmLCSEAAA/XL7mOBJ5C5AtZzl84spHJTJ+B9EAWsyP+IFGBFyG8poBod31QVxjyIjq82h1ez10AuZHyZeOeCElnV9Ow84PLNDRDes/Mia10ZVoypxNGpO4hTAFln9hcWC2Qbw0MS7ZLIWhfgNwNUwAzuUrGMAAAAAElFTkSuQmCC";

export const makeFakeBrowserService = (
    _window: Window): BrowserService => {
    return {
        backgroundPage: () => {
            return {
                ws1Finder: {
                    baseURL: () => Promise.resolve(
                        _window.localStorage.getItem("vmwareOneUrl") ||
                        "https://myvmware.workspaceair.com"
                    ),
                    clearCache: () => undefined,
                    getEntitlements: (query: string) => Promise.resolve([
                        {
                            icon: app1Icon,
                            isFavorite: true,
                            key: "app-one-id",
                            name: "Fly One",
                            target: "https://example.com/fly-one"
                        },
                        {
                            icon: app2Icon,
                            isFavorite: true,
                            key: "app-two-id",
                            name: "Workopedia",
                            target: "https://example.com/workopedia"
                        },
                        {
                            icon: app1Icon,
                            isFavorite: true,
                            key: "app-three-id",
                            name: "Concise Services",
                            target: "https://example.com/concise-services"
                        },
                        {
                            icon: app2Icon,
                            isFavorite: true,
                            key: "app-four-id",
                            name: "Sporksheets",
                            target: "https://example.com/sporksheets"
                        }
                    ]).then(r => r.filter((result)  => {
                        console.log(`fake browser service: entitlements ${query}`)
                        return (
                            result
                                .name
                                .toLowerCase()
                                .includes(query.toLowerCase())
                        );
                    }))
                }
            };
        },
        createTab: (url) => { _window.open(url); },
        getPrereleaseMarker: () => "0.0.0-dev",
        getStorage: (k, _default) => Promise.resolve(_window.localStorage.getItem(k) || _default),
        openOptions: () => undefined,
        requestPermissions: () => Promise.resolve(true),
        setStorage: (k, v) => Promise.resolve(_window.localStorage.setItem(k, v)),
        windowClose: () => _window.close()
    };
};
