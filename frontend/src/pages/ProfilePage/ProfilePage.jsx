import ProfileForm from '@/components/Auth/ProfileForm/ProfileForm';
import OrderList from '@/components/Orders/OrderList/OrderList';
import { useAuth } from "@/context/UseAuth";
import './ProfilePage.css';

const ProfilePage = ({ requestUser, onSaveUser }) => {
  const { user, logoutUser } = useAuth();

  if (!user) {
    return null; 
  }

  return (
    <div className="profile-page">
      
      <h2>Личные данные</h2>
      <ProfileForm user={requestUser} onSave={onSaveUser} />
      <h2>История заказов</h2>
      <OrderList></OrderList>
      <button className='exit' onClick={logoutUser}>Выйти</button>
    </div>
  );
};

export default ProfilePage;