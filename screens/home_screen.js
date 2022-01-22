import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {colors, font_family, font_size} from '../constants/constant_styles';
import {movie_details, trending, movie_search} from '../utils/api_request';
import Margin from '../components/Margin';
import TextInputComp from '../components/TextInputComp';
import {useNavigation} from '@react-navigation/native';
// This is the response form moviedb api
// {"adult": false, "backdrop_path": "/c6H7Z4u73ir3cIoCteuhJh7UCAR.jpg", "genre_ids": [28, 12, 14, 878], "id": 524434, "original_language": "en", "original_title": "Eternals", "overview": "The Eternals are a team of ancient aliens who have
// been living on Earth in secret for thousands of years. When an unexpected tragedy forces them out of the shadows, they are forced to reunite against mankind’s most ancient enemy, the Deviants.", "popularity": 10421.733, "poster_path": "/b6qUu00iIIkXX13szFy7d0CyNcg.jpg", "release_date": "2021-11-03", "title": "Eternals", "video": false, "vote_average": 7.2, "vote_count": 2982}

const Home_screen = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.user);
  const [Movies, setMovies] = useState([]);
  const [Trending, setTrending] = useState([]);
  const [Search, setSearch] = useState('');
  const [SearchResults, setSearchResults] = useState([]);
  useEffect(() => {
    const get_data = async () => {
      let Movie = await movie_details();
      setMovies(Movie.results);
    };
    get_data();

    const get_trending = async () => {
      let Movie = await trending();
      setTrending(Movie.results);
    };
    get_trending();
  }, []);

  const search_movie = async keywords => {
    setSearch(keywords);
    let Movie = await movie_search(keywords);
    setSearchResults(Movie.results);
  };

  const Seperator = () => {
    return <View style={{margin: 12}}></View>;
  };
  return (
    <View style={styles.container}>
      <Text style={styles.userName}>Hello {user.Username}</Text>
      {Movies.length && Trending.length === 0 ? (
        <>
          <ActivityIndicator size="small" color="#0000ff" />
        </>
      ) : (
        <>
          <TextInputComp
            placeholder_text="Search movie..."
            onChangeText={value => search_movie(value)}
          />
          <Margin style={{marginTop: '5%'}} />
          <ScrollView>
            <View style={{flex: 1}}>
              <Text style={styles.title}>
                {Search !== '' ? 'Search Results' : 'Popular Movies'}
              </Text>
              {Search !== '' ? (
                <>
                  <FlatList
                    horizontal={true}
                    data={SearchResults}
                    ItemSeparatorComponent={() => Seperator()}
                    renderItem={data => {
                      return (
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('Detail', {
                              movie_data: data.item,
                            })
                          }>
                          <Image
                            style={styles.image_style}
                            source={{
                              uri: `https://image.tmdb.org/t/p/w500/${data.item.poster_path}`,
                            }}
                          />
                          <View style={{width: 150}}>
                            <Text key={data.item.id} style={styles.movie_title}>
                              {data.item.title.length > 30
                                ? `${data.item.title.slice(0, 30)}...`
                                : `${data.item.title}`}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    }}
                    keyExtractor={item => item.id}
                  />
                </>
              ) : (
                <FlatList
                  contentContainerStyle={{flexGrow: 1}}
                  horizontal={true}
                  data={Movies}
                  ItemSeparatorComponent={() => Seperator()}
                  renderItem={data => {
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('Detail', {movie_data: data.item})
                        }>
                        <Image
                          style={styles.image_style}
                          source={{
                            uri: `https://image.tmdb.org/t/p/w500/${data.item.poster_path}`,
                          }}
                        />
                        <View style={{width: 150}}>
                          <Text key={data.item.id} style={styles.movie_title}>
                            {data.item.title.length > 30
                              ? `${data.item.title.slice(0, 30)}...`
                              : `${data.item.title}`}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                  keyExtractor={item => item.id}
                />
              )}
            </View>
            <Margin style={{marginTop: '5%'}} />
            <View style={{flex: 1}}>
              <Text style={styles.title}>Trending Movies</Text>
              <FlatList
                contentContainerStyle={{flexGrow: 1}}
                horizontal={true}
                ItemSeparatorComponent={() => Seperator()}
                data={Trending}
                renderItem={data => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Detail', {movie_data: data.item})
                      }>
                      <Image
                        style={styles.image_style}
                        source={{
                          uri: `https://image.tmdb.org/t/p/w500/${data.item.poster_path}`,
                        }}
                      />
                      <View style={{width: 150}}>
                        <Text key={data.item.id} style={styles.movie_title}>
                          {data.item.title.length > 30
                            ? `${data.item.title.slice(0, 30)}...`
                            : `${data.item.title}`}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={item => item.id}
              />
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  userName: {
    color: colors.dark_green,
    fontSize: font_size.h3,
    fontFamily: font_family.SemiBold,
  },
  title: {
    fontSize: font_size.regular,
    color: colors.dark_green,
    fontFamily: font_family.Bold,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  image_style: {
    height: 250,
    width: 150,
    borderRadius: 10,
    marginBottom: 4,
  },
  flat_view: {
    height: '25%',
    width: '12%',
  },
  movie_title: {
    fontSize: font_size.small,
    color: colors.dark_green,
    fontFamily: font_family.Regular,
  },
});

export default Home_screen;
