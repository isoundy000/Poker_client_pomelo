var BaseMgr = require("src/mj/mjBaseMgr");
var UserItem = require("src/mj/model/mjUserItem");
var Config = require("src/mj/config/mjConfig");

cc.Class({
    extends: BaseMgr,

    initData () {
    	this.m_playerList = {};
        this.m_seatPlayerList = {};
    },

    initUIView () {
    },

    //更新玩家
    updatePlayerList (userList) {
        var self = this;

        var selfMid = Global.SelfUserData.mid;
        var selfSeatID;

        //找到自己的seatID
        for (var mid in userList) {
            var userData = userList[mid];
            if (selfMid === mid) {
                selfSeatID = userData.seatID;
                break;
            }
        }

        //没有找到自己的座位号
        if (selfSeatID === undefined) {
            console.log("PPPPPPPPPPPPPPPPPPPPPPPP updatePlayerList 没有找到自己的座位号");
            Global.Tools._debug(userList);
            return;
        }

        //记录当前要刷新的玩家的mid和userData的映射
        var midMap = {};

        //计算每个玩家的本地座位号，同时刷新玩家信息
        for (var mid in userList) {
            var userData = userList[mid];
            var seatID = userData.seatID;
            var localSeatID = seatID - selfSeatID + 1;
            if (localSeatID < 0) {
                localSeatID = localSeatID + Config.PLAYER_NUM;
            }
            userData.localSeatID = localSeatID;
            midMap[userData.mid] = userData;

            var playerItem = self.m_seatPlayerList[localSeatID];
            if (playerItem) {
                console.log("PPPPPPPPPPPPPPPPPPPPPPPP 座位 " + localSeatID + " 有人在，直接刷新信息");
                playerItem.updateUserData(userData);
            } else {
                console.log("PPPPPPPPPPPPPPPPPPPPPPPP 座位 " + localSeatID + " 没有人，创建新玩家");
                var userItem = new UserItem();
                userItem.init(userData);
                self.node.addChild(userItem);
                self.m_playerList[userData.mid] = userItem;
                self.m_seatPlayerList[localSeatID] = userItem;
            }
        }

        //清除掉已经走了的玩家
        for (var mid in self.m_playerList) {
            if (!midMap[mid]) {
                console.log("PPPPPPPPPPPPPPPPPPPPPPPP 玩家 " + mid + " 离开，清除数据");
                var playItem = self.m_playerList[mid];
                playerItem.destroy();
                delete(self.m_playerList[mid]);
            }
        }
    },
    
    ////////////////////////////////////消息处理函数begin////////////////////////////////////
    enterRoom (res) {
    	this.updatePlayerList(res.userList);
    },
    ////////////////////////////////////消息处理函数end////////////////////////////////////
});