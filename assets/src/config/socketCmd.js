Global.SocketCmd = {
	//客户端请求服务端协议
	LOGIN: 20000, 									//登录
	REQUEST_USER_INFO: 20001, 						//获取玩家信息
	ENTER_GROUP_LEVEL: 20002, 						//加入场次

	ENTER_ROOM: 20100, 								//进入房间
	RELOAD_GAME: 20101, 							//断线重连
	USER_LEAVE: 20102, 								//玩家离开房间
	USER_READY: 20103, 								//玩家准备

	//服务端返回给客户端协议
	ROOM_INFO: 20200,								//房间信息
	UPDATE_USER_LIST: 20201, 						//刷新玩家列表
	ROUND_INFO: 20202,								//回合消息
	RESULT_INFO: 20203, 							//结算消息
	WAIT_USER_READY: 20204, 						//等待玩家准备
	USER_KICK: 20205, 								//玩家被踢出
	GAME_START: 20206, 								//游戏开始
}