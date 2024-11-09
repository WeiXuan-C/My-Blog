
import './index.scss'
import BarChart from './modules/BarChart'
import PieChart from './modules/PieChart'
import { Card} from 'antd';
import { useSelector } from 'react-redux';


const Profile = () => {

  const { username, role , avatar} = useSelector(state => state.user.userInfo)
  return (
      <div className='profileContent'>
      <Card hoverable
        style={{
          width: 320,
          height: 270,
        }}
      >
        <div>
          <img className="avatar" src={`src/pages/Layout/Profile/assets/${avatar}.jpeg`} alt="avatar" />
            <h4>{username}</h4>
            <p>{role}</p>
        </div>
      </Card>
      <BarChart />
      <PieChart />
      </div>
  )
}

export default Profile