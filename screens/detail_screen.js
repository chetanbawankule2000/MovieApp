import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors, font_family, font_size} from '../constants/constant_styles';
import {useNavigation} from '@react-navigation/native';
import {movie_detail_by_id, movie_cast} from '../utils/api_request';
import {minut_to_hours} from '../utils/time_conversion';

const Detail_screen = props => {
  const [DirectorCount, setDirectorCount] = useState(0);
  const [Directors, setDirectors] = useState([]);
  const [DetailById, setDetailById] = useState('');
  const [Cast, setCast] = useState('');
  const navigation = useNavigation();
  let data = props.route.params.movie_data;
  useEffect(() => {
    const get_detail_by_id = async () => {
      let Movie = await movie_detail_by_id(data.id);
      let cast = await movie_cast(data.id);
      setDetailById(Movie);
      setCast(cast);
      let count = 0;
      let directorArray = [];
      cast.crew.map((item, index) => {
        if (item.job === 'Director') {
          directorArray.push(item.name);
        }
      });
      setDirectorCount(count);
      setDirectors(directorArray);
    };
    get_detail_by_id();
  }, []);
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        style={styles.image_background}
        blurRadius={1}
        source={{uri: `https://image.tmdb.org/t/p/w500/${data.poster_path}`}}>
        <View style={styles.headingContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" color={colors.white} size={24} />
          </TouchableOpacity>
          <View style={styles.headingWrapper}>
            <Image
              style={styles.image}
              source={{
                uri: `https://image.tmdb.org/t/p/w500/${data.poster_path}`,
              }}
            />
            <View style={styles.headingText}>
              <Text style={styles.title}>{data.original_title}</Text>
              <View style={styles.headingDetails}>
                <View style={styles.headingReleaseDate}>
                  <Text style={styles.subTitleHeading}>Release date</Text>
                  <Text style={styles.subTitle}>{data.release_date}</Text>
                </View>
                <View>
                  <Text style={styles.subTitleHeading}>Ratings</Text>
                  <Text style={styles.subTitle}>{data.vote_average}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
      <ScrollView style={styles.body}>
        <View style={styles.bodyComponent}>
          <Text style={styles.bodySubTitle}>Director</Text>
          {Cast.crew === undefined ? (
            <ActivityIndicator />
          ) : (
            <View style={styles.genresNameView}>
              {Directors.map((item, index) => {
                return (
                  <Text key={index} style={styles.genresText}>
                    {item + (index < Directors.length - 1 ? ', ' : '')}
                  </Text>
                );
              })}
            </View>
          )}
        </View>
        <View style={styles.bodyComponent}>
          <Text style={styles.bodySubTitle}>Cast</Text>
          {Cast.cast === undefined ? (
            <ActivityIndicator />
          ) : (
            <View style={styles.genresNameView}>
              {Cast.cast.map((item, index) => {
                if (index <= 4) {
                  return (
                    <Text key={index} style={styles.genresText}>
                      {item.name + (index < 4 ? ', ' : '')}
                    </Text>
                  );
                }
              })}
            </View>
          )}
        </View>
        <View style={styles.bodyComponent}>
          <View style={styles.genresAndRuntimeView}>
            <View>
              <Text style={styles.bodySubTitle}>Runtime</Text>
              <Text style={styles.bodyText}>
                {minut_to_hours(DetailById.runtime)}
              </Text>
            </View>
            <View style={styles.genresView}>
              <Text style={styles.bodySubTitle}>Genres</Text>
              {DetailById.genres === undefined ? (
                <ActivityIndicator />
              ) : (
                <View style={styles.genresNameView}>
                  {DetailById.genres.map((item, index) => {
                    return (
                      <Text key={index} style={styles.genresText}>
                        {(index ? ', ' : '') + item.name}
                      </Text>
                    );
                  })}
                </View>
              )}
            </View>
          </View>
        </View>
        <View style={styles.bodyComponent}>
          <Text style={styles.bodySubTitle}>Overview</Text>
          <Text style={styles.bodyText}>{data.overview}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  body: {
    marginHorizontal: 25,
    marginTop: 25,
  },
  headingContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: '#000000BF',
    width: '100%',
    padding: 25,
  },
  headingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  headingText: {
    width: '50%',
  },
  headingDetails: {
    flexDirection: 'row',
  },
  headingReleaseDate: {
    marginRight: 16,
  },
  bodyComponent: {
    width: '100%',
    marginBottom: 24,
  },
  image: {
    width: 150,
    height: 250,
    alignSelf: 'center',
    borderRadius: 10,
  },
  title: {
    color: colors.white,
    fontFamily: font_family.Bold,
    fontSize: font_size.h3,
    marginBottom: 12,
  },
  subTitle: {
    color: colors.white,
    opacity: 0.75,
    fontSize: font_size.regular,
  },
  bodySubTitle: {
    color: colors.black,
    fontSize: font_size.regular,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  bodyText: {
    color: colors.black,
    fontSize: font_size.regular,
    fontWeight: '400',
    opacity: 0.75,
    lineHeight: 22,
  },
  genresText: {
    color: colors.black,
    fontSize: font_size.regular,
    fontWeight: '400',
    opacity: 0.75,
    lineHeight: 22,
  },
  genresNameText: {
    color: colors.black,
    fontSize: font_size.regular,
    fontWeight: '400',
    opacity: 0.75,
    lineHeight: 22,
    flexWrap: 'wrap',
  },
  subTitleHeading: {
    color: colors.white,
    fontSize: font_size.tiny,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  details: {
    color: colors.black,
    fontFamily: font_family.SemiBold,
    fontSize: font_size.mid,
  },
  image_background: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    height: 350,
    backgroundColor: '#40000000',
  },
  genresAndRuntimeView: {
    flexDirection: 'row',
  },
  genresView: {
    marginLeft: 16,
  },
  genresNameView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default Detail_screen;
