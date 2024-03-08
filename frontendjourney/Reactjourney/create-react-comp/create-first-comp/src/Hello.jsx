function Hello(){
    let myName = 'Bhavya';
    let number=456;
    let fullName = () =>{
        return 'Bhavya Mittal'
    }
    return <p>
        MessageNo: {number} I am your master {fullName()}
    </p>
}
export default Hello;