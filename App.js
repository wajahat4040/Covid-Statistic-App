import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Button,
  ListItem
} from 'react-native';
import Constants from 'expo-constants';
import { CheckBox } from 'react-native-elements';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AssetExample from './components/AssetExample';

type CheckboxComponentProps = {};
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const CountriesPage = ({ navigation }) => {
  const [getcountryname, setcountryname] = React.useState([]);
  const [getcondition, setcondition] = React.useState(true);
  const [getcompletearray, setcompletearray] = React.useState([]);
  const [getfilterarray, setfilterarray] = React.useState([]);
  const [getsearch, setsearch] = React.useState();
  const [getcount, setcount] = React.useState(0);

  const Countries = () => {
    fetch('https://world-population.p.rapidapi.com/allcountriesname', {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'world-population.p.rapidapi.com',
        'x-rapidapi-key': '027914bd19mshe814f892dfb4639p148750jsnd2d63ac26064',
      },
    })
      .then((response) => response.json())
      .then((responsep) => {
        setcountryname(responsep);

        setcondition(false);

        console.log(responsep);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  //searching data
  const searching = (data) => {
    setcount(1);
    if (data) {
      const newarray = getcompletearray.filter((item) => {
        const itemData = item ? item.toUpperCase() : ''.toUpperCase();
        const textData = data.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });

      setfilterarray(newarray);
      setsearch(data);
      console.log(getfilterarray);
    } else {
      setfilterarray(getcompletearray);
      setsearch(data);
    }
  };

  React.useEffect(() => {
    Countries();
  }, []);
  if (getcondition == true) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Waiting for response</Text>
      </View>
    );
  }
  if (getcount === 0) {
    for (var i = 0; i < getcountryname.body.countries.length; i++) {
      getcompletearray[i] = getcountryname.body.countries[i];
      getfilterarray[i] = getcountryname.body.countries[i];
    }
  }

  return (
    <View>
      <TextInput
        style={{ padding: 10, borderWidth: 1, margin: 10 }}
        onChangeText={(data) => {
          searching(data);
        }}
        value={getsearch}
        underlineColorAndroid="transparent"
        placeholder="Search Here"
      />

      <FlatList
        data={getfilterarray}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Country Covid Details', { country: item });
              }}>
              <View
                style={{
                  backgroundColor: '#00bfff',
                  margin: 3,
                  padding: 10,
                  alignItems: 'center',
                }}>
                <Text style={{ fontWeight: 'bold', color: 'white' }}>
                  {item}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};



const homeScreen = () => {
    const [getpdata, setpdata] = React.useState([]);
    const [getpcondition, setpcondition] = React.useState(true);
  
    const [getdata, setdata] = React.useState([]);
    const [getcondition, setcondition] = React.useState(true);
    var totalcase = 0;
    var confirmcovid = 0;
    var recoveredcovid = 0;
    var criticalcovid = 0;
    var deathcovid = 0;
    var percentconfirm = 0;
    var percentrecover = 0;
    var percentcritical = 0;
    var percentdeath = 0;
  
    const fetchingCovid = () => {
      fetch('https://covid-19-data.p.rapidapi.com/totals', {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
          'x-rapidapi-key': '027914bd19mshe814f892dfb4639p148750jsnd2d63ac26064',
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          setdata(responseJson);
          setcondition(false);
          console.log();
        })
        .catch((err) => {
          console.error(err);
        });
    };
  
    const getpopulation = () => {
      fetch('https://world-population.p.rapidapi.com/worldpopulation', {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'world-population.p.rapidapi.com',
          'x-rapidapi-key': '027914bd19mshe814f892dfb4639p148750jsnd2d63ac26064',
        },
      })
        .then((response) => response.json())
        .then((responsep) => {
          setpdata(responsep);
          setpcondition(false);
        })
        .catch((err) => {
          console.error(err);
        });
    };
  
    React.useEffect(() => {
      getpopulation();
      fetchingCovid();
    }, []);
  
    if (getcondition == true || getpcondition == true) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
  
          <Text>Waiting for response</Text>
        </View>
      );
    }
    {
      (totalcase = getpdata.body.world_population),
        (confirmcovid = getdata[0].confirmed),
        (recoveredcovid = getdata[0].recovered),
        (criticalcovid = getdata[0].critical),
        (deathcovid = getdata[0].deaths),
        (percentconfirm = (confirmcovid * 100) / totalcase),
        (percentconfirm = percentconfirm.toFixed(2)),
        (percentrecover = (recoveredcovid * 100) / confirmcovid),
        (percentrecover = percentrecover.toFixed(2)),
        (percentcritical = (criticalcovid * 100) / confirmcovid),
        (percentcritical = percentcritical.toFixed(2)),
        (percentdeath = (deathcovid * 100) / confirmcovid),
        (percentdeath = percentdeath.toFixed(2));
    }
  
    return (
      <View>
        <View style={{ alignItems: 'center', margin: 10 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#A9A9A9' }}>
            <Text style={{ color: 'red' }}>W</Text>orld{' '}
            <Text style={{ color: 'red' }}>C</Text>ovid{' '}
            <Text style={{ color: 'red' }}>S</Text>tatistics
          </Text>
        </View>
        <ScrollView>
          <View style={{ flexDirection: 'row' }}>
            <View
              style={{
                backgroundColor: '#00bfff',
                width: '45%',
                borderRadius: 20,
                alignItems: 'center',
                margin: 8,
                padding: 8,
              }}>
             
              <Text style={{ fontWeight: 'bold' }}>
                Confirmed Cases{'\n'}
                {getdata[0].confirmed}
                {'\n'}Confirmed Cases{'\n'}Percentage{'\n'}
                {percentconfirm}%
              </Text>
            </View>
  
            <View
              style={{
                backgroundColor: '#00bfff',
                width: '45%',
                borderRadius: 20,
                alignItems: 'center',
                margin: 8,
                padding: 8,
              }}>
            
              <Text style={{ fontWeight: 'bold' }}>
                Recovered Cases{'\n'}
                {getdata[0].recovered}
                {'\n'}Recovered Cases{'\n'}Percentage{'\n'}
                {percentrecover}%
              </Text>
            </View>
          </View>
  
          <View style={{ flexDirection: 'row' }}>
            <View
              style={{
                backgroundColor: '#00bfff',
                width: '45%',
                borderRadius: 20,
                alignItems: 'center',
                margin: 8,
                padding: 8,
              }}>
              
              <Text style={{ fontWeight: 'bold', color: 'white' }}>
                Critical Cases{'\n'}
                {getdata[0].critical}
                {'\n'}Critical Cases{'\n'}Percentage{'\n'}
                {percentcritical}%
              </Text>
            </View>
  
            <View
              style={{
                backgroundColor: '#00bfff',
                width: '45%',
                borderRadius: 20,
                alignItems: 'center',
                margin: 8,
                padding: 8,
              }}>
           
              <Text style={{ fontWeight: 'bold', color: 'white' }}>
                Death{'\n'}
                {getdata[0].deaths}
                {'\n'}Death{'\n'}Percentage{'\n'}
                {percentdeath}%
              </Text>
            </View>
          </View>
  
          <View
            style={{
              backgroundColor: '#00bfff',
              width: '95%',
              borderRadius: 20,
              alignItems: 'center',
              margin: 8,
              padding: 8,
            }}>
            
            <Text style={{ fontWeight: 'bold', color: 'white' }}>
              Last Updated{'\n'}
              {getdata[0].lastUpdate}
            </Text>
          </View>
        </ScrollView>
      </View>
      //
    );
  };
  

const Countrydetails = ({ route, navigation }) => {
  const countryname = route.params.country;

  const [getpdata, setpdata] = React.useState([]);
  const [getpcondition, setpcondition] = React.useState(true);

  const [getdata, setdata] = React.useState([]);
  const [getcondition, setcondition] = React.useState(true);
  var totalcase = 0;
  var confirmcovid = 0;
  var recoveredcovid = 0;
  var criticalcovid = 0;
  var deathcovid = 0;
  var percentconfirm = 0;
  var percentrecover = 0;
  var percentcritical = 0;
  var percentdeath = 0;

  const SaveData = async (value) => {
    try {
      console.log('saving');
      var stored = await LoadData();

      stored.push(value);
      console.log(stored);
      const jsonValue = JSON.stringify(stored);
      await AsyncStorage.setItem('country', jsonValue);
      console.log('saved');
    } catch (e) {
      // saving error
    }
  };

  const LoadData = async () => {
    try {
      console.log('loading');
      const jsonValue = await AsyncStorage.getItem('country');
      var a = jsonValue != null ? JSON.parse(jsonValue) : [];
      console.log('loaded');
      console.log(a);
      return a;
    } catch (e) {
      // error reading value
    }
  };

  const getcovid = () => {
    fetch(`https://covid-19-data.p.rapidapi.com/country?name=${countryname}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
        'x-rapidapi-key': '027914bd19mshe814f892dfb4639p148750jsnd2d63ac26064',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setdata(responseJson);
        setcondition(false);
        console.log();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getpopulation = () => {
    fetch('https://world-population.p.rapidapi.com/worldpopulation', {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'world-population.p.rapidapi.com',
        'x-rapidapi-key': '027914bd19mshe814f892dfb4639p148750jsnd2d63ac26064',
      },
    })
      .then((response) => response.json())
      .then((responsep) => {
        setpdata(responsep);
        setpcondition(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  React.useEffect(() => {
    getpopulation();
    getcovid();
  }, []);

  if (getcondition == true || getpcondition == true) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />

        <Text>Waiting for response</Text>
      </View>
    );
  }
  {
    (totalcase = getpdata.body.world_population),
      (confirmcovid = getdata[0].confirmed),
      (recoveredcovid = getdata[0].recovered),
      (criticalcovid = getdata[0].critical),
      (deathcovid = getdata[0].deaths),
      (percentconfirm = (confirmcovid * 100) / totalcase),
      (percentconfirm = percentconfirm.toFixed(2)),
      (percentrecover = (recoveredcovid * 100) / confirmcovid),
      (percentrecover = percentrecover.toFixed(2)),
      (percentcritical = (criticalcovid * 100) / confirmcovid),
      (percentcritical = percentcritical.toFixed(2)),
      (percentdeath = (deathcovid * 100) / confirmcovid),
      (percentdeath = percentdeath.toFixed(2));
  }

  return (
    <View>
      <View style={{ alignItems: 'center', margin: 10 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#A9A9A9' }}>
          {countryname} <Text style={{ color: 'red' }}>C</Text>ovid{' '}
          <Text style={{ color: 'red' }}>S</Text>tatistics
        </Text>
        <TouchableOpacity
          style={{
            padding: 5,
            borderWidth: 1,
            borderRadius: 10,
            backgroundColor: '#0F52BA',
            margin: 5,
          }}
          onPress={() => SaveData({ Country: countryname })}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            {' '}
            Add To Favourite
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              backgroundColor: '#ffcccb',
              width: '45%',
              borderRadius: 20,
              alignItems: 'center',
              margin: 8,
              padding: 8,
            }}>
            <Icon
              style={{ color: 'red', fontSize: 22 }}
              name="heartbeat"
              size="27"
            />
            <Text style={{ fontWeight: 'bold' }}>
              Confirmed Cases{'\n'}
              {getdata[0].confirmed}
              {'\n'}Confirmed Cases{'\n'}Percentage{'\n'}
              {percentconfirm}%
            </Text>
          </View>

          <View
            style={{
              backgroundColor: '#90EE90',
              width: '45%',
              borderRadius: 20,
              alignItems: 'center',
              margin: 8,
              padding: 8,
            }}>
            <Icon
              style={{ color: 'red', fontSize: 22 }}
              name="medkit"
              size="27"
            />
            <Text style={{ fontWeight: 'bold' }}>
              Recovered Cases{'\n'}
              {getdata[0].recovered}
              {'\n'}Recovered Cases{'\n'}Percentage{'\n'}
              {percentrecover}%
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              backgroundColor: 'red',
              width: '45%',
              borderRadius: 20,
              alignItems: 'center',
              margin: 8,
              padding: 8,
            }}>
            <Icon
              style={{ color: 'black', fontSize: 22 }}
              name="heartbeat"
              size="27"
            />
            <Text style={{ fontWeight: 'bold', color: 'white' }}>
              Critical Cases{'\n'}
              {getdata[0].critical}
              {'\n'}Critical Cases{'\n'}Percentage{'\n'}
              {percentcritical}%
            </Text>
          </View>

          <View
            style={{
              backgroundColor: '#A9A9A9',
              width: '45%',
              borderRadius: 20,
              alignItems: 'center',
              margin: 8,
              padding: 8,
            }}>
            <Icon
              style={{ color: 'black', fontSize: 22 }}
              name="medkit"
              size="27"
            />
            <Text style={{ fontWeight: 'bold', color: 'white' }}>
              Death{'\n'}
              {getdata[0].deaths}
              {'\n'}Death{'\n'}Percentage{'\n'}
              {percentdeath}%
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: '#ADD8E6',
            width: '95%',
            borderRadius: 20,
            alignItems: 'center',
            margin: 8,
            padding: 8,
          }}>
          <Icon
            style={{ color: 'black', fontSize: 22, margin: 5 }}
            name="file"
            size="27"
          />
          <Text style={{ fontWeight: 'bold', color: 'white' }}>
            Last Updated{'\n'}
            {getdata[0].lastUpdate}
          </Text>
        </View>
      </ScrollView>
    </View>
    //
  );
};


const FavouriteScreen=({navigation})=>{

  const LoadData = async () => {
    try {
      console.log("loading")
      const jsonValue = await AsyncStorage.getItem('country')
      var a = jsonValue!=null?JSON.parse(jsonValue):[];
      console.log("loaded")
      console.log(a)
      console.log(country)
      setcountry(a);
      setcond(false);
      return a

    } catch(e) {
    
    }
  }
  const [country,setcountry] = React.useState([])
  const [getcond,setcond]=React.useState(true);
  const [getcondition,setcondition]=React.useState(true);

  React.useEffect(()=>{
    
  })
  
  return(
    <View>
    <Button
    title="View"
    onPress={async()=>setcountry(await LoadData())}
    />
    <TouchableOpacity
          onPress={async() => {
    AsyncStorage.clear();
    setcondition(false);
    
}}
          style={{
            padding: 5,
            alignItems:'center',
            marginLeft:80,
            marginRight:80,
            
            borderWidth: 1,
            borderRadius: 10,
            backgroundColor: '#00bfff',
            margin: 5,
          }}
          >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            {' '}
            Delete All
          </Text>
        </TouchableOpacity>
    { getcondition  ? country.map((l, i) => (
      
      <ScrollView >
          <TouchableOpacity 
          style={{backgroundColor: '#00bfff',margin: 3,padding: 10,width:'60%',alignItems:'center'}} 
          onPress={() => {
                navigation.navigate('Country Covid Details', { country: l.Country});
              }}
          >
          <Text style={{fontWeight:'bold'}}>{l.Country}</Text>
          </TouchableOpacity>
          
          </ScrollView>
          
       
      
    )):null
  }
    </View>
  );
  }


export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
      <Drawer.Screen name="►Home" component={homeScreen} />
      <Drawer.Screen name="►Country" component={CountriesPage} />
        <Stack.Screen name="►Country Detail" component={Countrydetails} />
      <Drawer.Screen name="►Favourite" component={FavouriteScreen} />
        
      

        
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,

    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
