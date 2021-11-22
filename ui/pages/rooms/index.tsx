import { title } from "process";
import React from "react";
import * as ws_manager from "../../utils/ws_manager";

function Rooms(){
 // let post = '1번 방'; // 데이터 바인딩

  return(
    <div>
      
        <div style={{color : 'green', fontSize:'40px'}}>Title</div>

      
      <h3 style={{width: '300px', height: '45px', margin : '50px', backgroundColor: 'silver'}}> 1번 방 </h3>
      
      
      <div className='list'>
      <h3>2번 방</h3>
      </div>

      <div className='list'>
      <h3>3번 방</h3>
      </div>
    </div>
  );
}
// const Rooms: React.FC = ({}) => {
  
//   let post = "테스팅";
//   return (
//     <div>연습용 만들기
//       <h3>{post}</h3>
//       </div>
//   );
//   // return <div>뭐지??</div>;
// };


export default Rooms;
