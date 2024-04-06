import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  inputs: {
    width: "90%",
  },
  buttons: {
    width: "90%",
  },
  textNavigation:{
    marginTop:20,
    fontSize:15,
    color: "#5322af",
    fontWeight:'bold',
  },
  contentHome:{
    flex: 1,
    marginVertical:50,
    marginHorizontal:20
  },
  headerHome:{
    flexDirection:'row',
    gap: 15,
    alignItems:'center'
  },
  icon:{
    flex:1,
    alignItems:'flex-end'
  },
  modal:{
    paddingHorizontal:20,
    paddingVertical:20,
    backgroundColor:'#fff',
    marginHorizontal:20,
    borderRadius: 10,
  },
  headerModal:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  contentLetter:{
    flexDirection:'row',
    paddingHorizontal:10,
    paddingVertical:30,
    alignItems:'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 10,
    bottom: 10,
  },
  contentDetailLetter:{
    flex:1,
    paddingHorizontal:20,
    backgroundColor:'#fff',
    gap:20
  },
  subjectLetter:{
    flexDirection:'row',
    alignItems:'center',
    gap:10
  },
  textMessage:{
    marginBottom:10,
    fontWeight:'bold',
    fontSize:18
  }
});
