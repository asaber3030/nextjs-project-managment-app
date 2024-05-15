const UserProfile = ({ params }: { params: { username: string } }) => {
  return (
    <div>
      Profile of {params.username}
    </div>
  );
}
 
export default UserProfile;