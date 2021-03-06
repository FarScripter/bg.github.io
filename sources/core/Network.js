"use strict";
///<reference path="../../dts/pixi.js.d.ts"/>
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var EventEmitter = PIXI.utils.EventEmitter;
var Network = (function (_super) {
    __extends(Network, _super);
    function Network() {
        var _this = _super.call(this) || this;
        _this._oponnentEmulationIndex = 0;
        return _this;
    }
    Network.prototype.getSoket = function () {
        return this._socket;
    };
    Network.prototype.connect = function () {
        // this._socket.onclose = (event) => this.onClose(event) ;
        // this._socket.onmessage = (event) => this.onMessage(event);
    };
    // TODO Сделать очередь
    // Занятость игры
    // Если игра занята сеть добавляет ответы сервера в массив (очередь)
    // По мере того как игра освобождается она говорит об этом сети и сеть отдает ответ сервера из очереди
    Network.prototype.send = function (data) {
        // this._socket.send(JSON.stringify(data));
        switch (data.CLASS_NAME) {
            case 'Enter':
                this.emit(Network.EVENT_DATA, {
                    CLASS_NAME: 'GameState',
                    // whitePositions: [ 103, 305, 2404, 2103 ],
                    // blackPositions:[ 403, 905, 1803, 1604 ],
                    // cubeValues: 0,
                    color: 0,
                    turn: 'Jp',
                    tableName: "Bill's table"
                });
                setTimeout(function () {
                    this.emit(Network.EVENT_DATA, {
                        CLASS_NAME: 'GameStart',
                        enemyUserName: 'Ivan'
                    });
                }.bind(this), 8000);
                break;
            case 'ThrowCube':
                this.emit(Network.EVENT_DATA, {
                    CLASS_NAME: 'CubeValue',
                    // cubeValues: 25
                    cubeValues: (Math.floor(Math.random() * (6)) + 1) * 10 + Math.floor(Math.random() * (6)) + 1
                });
                break;
            case 'ShowPossiblePositions':
                this.emit(Network.EVENT_DATA, {
                    CLASS_NAME: 'PossiblePositions',
                    positionQuantity: 4,
                    possiblePositions: [504, 407, 609, 2023]
                });
                break;
            case 'MoveChip':
                setTimeout(function () {
                    this.emit(Network.EVENT_DATA, {
                        CLASS_NAME: 'ChangeTable',
                        oldPosition: data.oldPosition,
                        newPosition: data.newPosition
                    });
                }.bind(this), 100);
                break;
            case 'EndOfTurn':
                this.emit(Network.EVENT_DATA, {
                    CLASS_NAME: 'GameState',
                    // whitePositions: [ 103, 305, 2404, 2103 ],
                    // blackPositions:[ 403, 905, 1803, 1604 ],
                    // cubeValues: 0,
                    color: 0,
                    turn: 'Ivan',
                    tableName: "Bill's table"
                });
                switch (this._oponnentEmulationIndex) {
                    case 0:
                        setTimeout(function () {
                            this.emit(Network.EVENT_DATA, {
                                CLASS_NAME: 'CubeValue',
                                // cubeValues: (Math.floor(Math.random() * (6)) + 1) * 10 + Math.floor(Math.random() * (6)) + 1
                                cubeValues: 15
                            });
                        }.bind(this), 3000);
                        setTimeout(function () {
                            this.emit(Network.EVENT_DATA, {
                                CLASS_NAME: 'ChangeTable',
                                oldPosition: 0,
                                newPosition: 1
                            });
                        }.bind(this), 7500);
                        setTimeout(function () {
                            this.emit(Network.EVENT_DATA, {
                                CLASS_NAME: 'ChangeTable',
                                oldPosition: 0,
                                newPosition: 5
                            });
                        }.bind(this), 9000);
                        setTimeout(function () {
                            this.emit(Network.EVENT_DATA, {
                                CLASS_NAME: 'GameState',
                                // whitePositions: [ 103, 305, 2404, 2103 ],
                                // blackPositions:[ 403, 905, 1803, 1604 ],
                                // cubeValues: 0,
                                color: 0,
                                turn: 'Jp',
                                tableName: "Bill's table"
                            });
                        }.bind(this), 9500);
                        this._oponnentEmulationIndex += 1;
                        break;
                    case 1:
                        setTimeout(function () {
                            this.emit(Network.EVENT_DATA, {
                                CLASS_NAME: 'CubeValue',
                                // cubeValues: (Math.floor(Math.random() * (6)) + 1) * 10 + Math.floor(Math.random() * (6)) + 1
                                cubeValues: 31
                            });
                        }.bind(this), 3000);
                        setTimeout(function () {
                            this.emit(Network.EVENT_DATA, {
                                CLASS_NAME: 'ChangeTable',
                                oldPosition: 1,
                                newPosition: 5
                            });
                        }.bind(this), 7500);
                        setTimeout(function () {
                            this.emit(Network.EVENT_DATA, {
                                CLASS_NAME: 'GameState',
                                // whitePositions: [ 103, 305, 2404, 2103 ],
                                // blackPositions:[ 403, 905, 1803, 1604 ],
                                // cubeValues: 0,
                                color: 0,
                                turn: 'Jp',
                                tableName: "Bill's table"
                            });
                        }.bind(this), 8000);
                        this._oponnentEmulationIndex += 1;
                        break;
                    case 2:
                        setTimeout(function () {
                            this.emit(Network.EVENT_DATA, {
                                CLASS_NAME: 'CubeValue',
                                // cubeValues: (Math.floor(Math.random() * (6)) + 1) * 10 + Math.floor(Math.random() * (6)) + 1
                                cubeValues: 22
                            });
                        }.bind(this), 3000);
                        setTimeout(function () {
                            this.emit(Network.EVENT_DATA, {
                                CLASS_NAME: 'ChangeTable',
                                oldPosition: 5,
                                newPosition: 9
                            });
                        }.bind(this), 7500);
                        setTimeout(function () {
                            this.emit(Network.EVENT_DATA, {
                                CLASS_NAME: 'ChangeTable',
                                oldPosition: 5,
                                newPosition: 9
                            });
                        }.bind(this), 9000);
                        setTimeout(function () {
                            this.emit(Network.EVENT_DATA, {
                                CLASS_NAME: 'GameState',
                                // whitePositions: [ 103, 305, 2404, 2103 ],
                                // blackPositions:[ 403, 905, 1803, 1604 ],
                                // cubeValues: 0,
                                color: 0,
                                turn: 'Jp',
                                tableName: "Bill's table"
                            });
                        }.bind(this), 9500);
                        this._oponnentEmulationIndex += 1;
                        break;
                }
                break;
        }
    };
    Network.prototype.enter = function () {
        // Посылаем Enter, на него приходит ГС.
        this.send({
            CLASS_NAME: 'Enter'
        });
    };
    Network.prototype.openConnection = function (url) {
        // подключение
        this._socket = new WebSocket(url);
        this._socket.addEventListener('close', this.onClose.bind(this));
        this._socket.addEventListener('message', this.onMessage.bind(this));
        this._socket.addEventListener('error', this.onError.bind(this));
        this._socket.addEventListener('open', this.onOpen.bind(this));
        this.emit(Network.EVENT_CONNECTED);
    };
    // public moveChips():void
    // {
    //     // запрашиваем разрешение на сдвиг фишки.
    //     this.send({
    //         CLASS_NAME: 'MoveChip',
    //         Positions: 306
    //     })
    // }
    Network.prototype.onError = function (event) {
        this.emit(Network.EVENT_ERROR);
        // console.log(event.target.readyState);
    };
    Network.prototype.onOpen = function () {
        console.log('Connection succeed.');
        // this.emit(Network.EVENT_CONNECTED);
    };
    Network.prototype.onClose = function (event) {
        if (event.wasClean) {
            // console.log('Соединение закрыто чисто');
            this.emit(Network.EVENT_DISCONNECTED, {
                status: 'wasClean'
            });
        }
        else {
            // console.log('Обрыв соединения сообщение из класса Network');
            this.emit(Network.EVENT_DISCONNECTED, {
                status: 'disconnection'
            });
        }
        // console.log('Код: ' + event.code + ' причина: ' + event.reason);
    };
    Network.prototype.onMessage = function (event) {
        console.log("говорю из класса нетворк что сервер мне сказал--->>>", event.data);
        console.log(typeof event.data);
        this.emit(Network.EVENT_DATA, {
            status: 'message',
            data: event.data
        });
    };
    Network.prototype.disconnect = function () {
        this._socket.close();
        this.emit(Network.EVENT_DISCONNECTED);
    };
    Network.EVENT_CONNECTED = 'Connected';
    Network.EVENT_DISCONNECTED = 'Disconnected';
    Network.EVENT_DATA = 'Data';
    Network.EVENT_ERROR = 'Error';
    return Network;
}(EventEmitter));
exports.Network = Network;
