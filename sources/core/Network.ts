///<reference path="../../dts/pixi.js.d.ts"/>

import EventEmitter = PIXI.utils.EventEmitter;

export class Network extends EventEmitter
{
    public static EVENT_CONNECTED:string = 'Connected';
    public static EVENT_DISCONNECTED:string = 'Disconnected';
    public static EVENT_DATA:string = 'Data';
    public static EVENT_ERROR:string = 'Error';
    public static EVENT_GAME_IS_WAITING:string = 'GameIsWaiting';
    public static EVENT_GAME_IS_BUSY:string = 'GameIsBusy';
    private _socket:WebSocket;
    private _opponentEmulationIndex:number = 0;
    private _gameIsBusy:boolean;
    private _queue:any[] = [];


    constructor()
    {
        super();
        this.on(Network.EVENT_GAME_IS_WAITING, this.popData);
        this.on(Network.EVENT_GAME_IS_BUSY, this.storeData);
    }

    public getSocket(){
        return this._socket;
    }


    // TODO Сделать очередь
    // Занятость игры
    // Если игра занята сеть добавляет ответы сервера в массив (очередь)
    // По мере того как игра освобождается она говорит об этом сети и сеть отдает ответ сервера из очереди

    public send(data:any):void
    {
        // this._socket.send(JSON.stringify(data));
        switch (data.CLASS_NAME)
        {
            case 'Enter':
                this.emit(Network.EVENT_DATA, {
                    CLASS_NAME: 'GameState',
                    // whitePositions: [ 103, 305, 2404, 2103 ],
                    // blackPositions:[ 403, 905, 1803, 1604 ],
                    // cubeValues: 0,
                    color: 0,
                    turn: 'Jp',
                    tableName:"Bill's table"
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
                    possiblePositions: [ 504,407,609, 2023 ]
                });
                break;
            case 'MoveChip':
                setTimeout(function () {
                    this.emit(Network.EVENT_DATA, {
                        CLASS_NAME:'ChangeTable',
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
                    tableName:"Bill's table"
                });
                switch (this._opponentEmulationIndex)
                {
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
                                CLASS_NAME:'ChangeTable',
                                oldPosition: 0,
                                newPosition: 1
                            });
                        }.bind(this), 7500);
                        setTimeout(function () {
                            this.emit(Network.EVENT_DATA, {
                                CLASS_NAME:'ChangeTable',
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
                                tableName:"Bill's table"
                            });
                        }.bind(this), 9500);
                        this._opponentEmulationIndex += 1;
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
                                CLASS_NAME:'ChangeTable',
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
                                tableName:"Bill's table"
                            });
                        }.bind(this), 8000);
                        this._opponentEmulationIndex += 1;
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
                                CLASS_NAME:'ChangeTable',
                                oldPosition: 5,
                                newPosition: 9
                            });
                        }.bind(this), 7500);
                        setTimeout(function () {
                            this.emit(Network.EVENT_DATA, {
                                CLASS_NAME:'ChangeTable',
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
                                tableName:"Bill's table"
                            });
                        }.bind(this), 9500);
                        this._opponentEmulationIndex += 1;
                        break;
                }
                break;
        }
    }

    public enter():void
    {
        // Посылаем Enter, на него приходит ГС.
        this.send({
            CLASS_NAME: 'Enter'
        });
    }

    public openConnection(url:any):void {
        // подключение
        // this._socket = new WebSocket(url);
        // this._socket.addEventListener('close', this.onClose.bind(this));
        // this._socket.addEventListener('message', this.onMessage.bind(this));
        // this._socket.addEventListener('error', this.onError.bind(this));
        // this._socket.addEventListener('open', this.onOpen.bind(this));
        this.emit(Network.EVENT_CONNECTED);
    }

    private onError(event:any)
    {
        this.emit(Network.EVENT_ERROR);
        // console.log(event.target.readyState);
    }

    private onOpen()
    {
        console.log('Connection succeed.');
        // this.emit(Network.EVENT_CONNECTED);
    }

    private onClose(event:any):void
    {
        if (event.wasClean) {
            // console.log('Соединение закрыто чисто');
            this.emit(Network.EVENT_DISCONNECTED,{
                status:'wasClean'
            })

        } else {
            // console.log('Обрыв соединения сообщение из класса Network');
            this.emit(Network.EVENT_DISCONNECTED,{
                status: 'disconnection'
            })
        }
        // console.log('Код: ' + event.code + ' причина: ' + event.reason);
    }

    private onMessage(event:any):void
    {
        console.log("Data from server: ", event.data);
        if (this._gameIsBusy)
        {
            this._queue.push(event.data);
        }
        else
        {
            this.emit(Network.EVENT_DATA,event.data);
        }
    }

    private storeData()
    {
        this._gameIsBusy = true;
    }

    private popData()
    {
        this._gameIsBusy = false;
        this.emit(Network.EVENT_DATA, this._queue.shift());
    }

    private disconnect()
    {
        this._socket.close();
        this.emit(Network.EVENT_DISCONNECTED);
    }
}