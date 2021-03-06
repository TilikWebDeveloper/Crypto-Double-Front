import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { w3cwebsocket } from "websocket";
import { withRouter } from 'react-router-dom';

import Double from './double';

import {createNotification} from '../../redux/notifications-reducer';
import {onChangeBetAmount, calcBetAmount, socketSetNewMessage, socketSetNewBet, socketSetStartGame, getBalance, rouletteResize, clearChat, startGame, spinRoulette, createBet, sendChatMessage} from '../../redux/double-reducer';
import {showModal} from '../../redux/modal-window-reducer';

const websocket = new w3cwebsocket('ws://localhost:3012');

const DoubleContainer = (props) => {

    useEffect(() => {
        websocket.onopen = () => {
            props.createNotification('Socket connected!', 'success');
        };
    
        websocket.onclose = () => {
            props.createNotification('Socket disconected! Pls reload page!', 'danger', false);
        };
    
        websocket.onmessage = (message) => {
            let data = JSON.parse(message.data);
    
            switch (data.type) {
                case 'new_bet':
                    props.socketSetNewBet(data)
                    break;
    
                case 'chat_new_msg':
                    props.socketSetNewMessage(data)
                    break;
    
                case 'game':
                    if (data.game_status === 'start') {
                        props.socketSetStartGame(data);
                        props.startGame(data.timer);
                    } else {
                        props.spinRoulette(
                            data.win_number,
                            data.win_number_section,
                            props.roulette_data.roulette_styles.backgroundPositionX,
                            props.roulette_data.roulette_size.width,
                            props.roulette_data.roulette_size.height,
                            props.user_data.user_current_bet
                        );
                    }
                    break;

                default:
                    break;
            }
        };
    }, [websocket, props.roulette_data]);

    const onCreateBet = (color) => props.createBet(props.user_data.user_bet_amount, color);

    const calcBetAmount = (action) => {
        const value = parseInt(props.user_data.user_bet_amount) || 0;
        
        switch (action) {
            case 'clear':
                return props.calcBetAmount('');

            case '+1':
                return props.calcBetAmount(value + 1);

            case '+10':
                return  props.calcBetAmount(value + 10);

            case '+100':
                return props.calcBetAmount(value + 100);

            case '+1000':
                return props.calcBetAmount(value + 1000);

            case '1/2':
                return props.calcBetAmount(value / 2);

            case 'x2':
                return props.calcBetAmount(value * 2);

            case 'max':
                return props.calcBetAmount(props.user_balance);

            default:
                break;
        }
    }

    return 	(
        <Double
            user_balance={props.user_balance}
            user_bet_amount={props.user_data.user_bet_amount}
            chat_message_list={props.chat_data.chat_message_list}
            user_chat_text={props.chat_data.user_chat_text}
            connection_count={props.chat_data.connection_count}
            time_text={props.roulette_data.time_left_styles.time_text}
            time_line_width={props.roulette_data.time_left_styles.time_line_width}
            roulette_styles={props.roulette_data.roulette_styles}
            last_numbers={props.roulette_data.last_numbers}
            now_hash_round={props.roulette_data.now_hash_round}
            total_bet_data={props.total_bet_data}
            bet_container={props.bet_container}

            onCreateBet={onCreateBet}
            getBalance={props.getBalance}
            clearChat={props.clearChat}
            onChangeBetAmount={props.onChangeBetAmount} 
            rouletteResize={props.rouletteResize}
            showModal={props.showModal}
            onChangeChatText={props.onChangeChatText}
            sendChatMessage={props.sendChatMessage}
            calcBetAmount={calcBetAmount}
        />
    );
}

let mapStateToProps = (state) => {
	return {
        ...state.double_page,
        user_balance: state.user.user_balance,
        user_is_auth: state.auth.is_auth
	};
}

let withUrlDataContainerComponent = withRouter(DoubleContainer);

export default connect(mapStateToProps, {
	onChangeBetAmount,
	calcBetAmount,
	socketSetNewMessage,
	socketSetNewBet,
	socketSetStartGame,
	rouletteResize,
	clearChat,
    showModal,
    spinRoulette,
    startGame,
    getBalance,
    createBet,
    sendChatMessage,
    createNotification
})(withUrlDataContainerComponent);