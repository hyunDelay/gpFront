import React from 'react';
import styled from 'styled-components';

const StyledRewardChangeModal = styled.div`
    width: 400px;
    height: 500px;
    background-color: white;
    display: position;
    position: absolute;
    z-index: 5;
`;

const RewardChangeModal = () => {


    return (
        <StyledRewardChangeModal>
            {/* {
                rewardVoList.map((vo)=>{
                    return(
                        <button key={vo.no} onClick={(e)=>{handleRewardClick(vo.no, e)}} className='reward'>
                            <div>{vo.amount}원 + </div>
                            <div>{vo.name}</div>
                        </button>
                    );
                })
            } */}
        </StyledRewardChangeModal>
    );
};

export default RewardChangeModal;