import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

// import FotoOne from "../../assets/one.jpeg";
// import IconMarket from '../../assets/Icons/shop.svg';

const dimensions = Dimensions.get("window");

export default class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Image
              source={require("../../assets/one.jpeg")}
              resizeMode="cover"
              style={styles.headerImage}
            />
            <View style={{ marginTop: 10 }}>
              <Text style={styles.headerText}>
                Bupati Malang Hadiri kegiatan Gema desa di kecamatan Tumpang...
              </Text>
            </View>
            <View style={styles.ketDetail}>
              <Text style={styles.ketText}>By Admin</Text>
              <Text style={styles.ketText}>03 April 2021 05.50 AM</Text>
            </View>
          </View>
          {/* <View style={styles.date}>
                        <Text style={styles.dateText}>03 April 2021</Text>
                    </View> */}
        </View>
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              justifyContent: "space-around",
            }}
          >
            <TouchableOpacity
              style={styles.batalBtn}
              onPress={() => this.props.navigation.navigate("Data Warga")}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Icon
                  style={{ right: 5 }}
                  name="people"
                  color={"#3C486B"}
                  size={25}
                />
                <Text style={styles.batalText}>Data Warga</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.batalBtn}
              onPress={() =>
                this.props.navigation.navigate("Tambah Data Warga")
              }
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Icon
                  style={{ right: 5 }}
                  name="person-add"
                  color={"#3C486B"}
                  size={25}
                />
                <Text style={styles.batalText}>Daftarkan Warga</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.menuContainer}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Kartu Keluarga")}
              style={[styles.menuWrapper, { width: "25%" }]}
            >
              <View style={styles.menuBox}>
                <Icon name="card-outline" size={25} color="#3C486B" />
              </View>
              <Text style={styles.menuText}>Kartu Keluarga</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("E-Pasar")}
              style={[styles.menuWrapper, { width: "25%" }]}
            >
              <View style={styles.menuBox}>
                {/* <Image
                                    source={require('../../assets/Icons/shop.svg')}
                                    style={{ width: 25, height: 25, color: '#000' }}
                                /> */}
                <Icon name="basket-outline" size={25} color="#3C486B" />
              </View>
              <Text style={styles.menuText}>E-Pasar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {}}
              style={[styles.menuWrapper, { width: "25%" }]}
            >
              <View style={styles.menuBox}>
                <Icon name="bar-chart-outline" size={25} color="#3C486B" />
              </View>
              <Text style={styles.menuText}>Bansos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {}}
              style={[styles.menuWrapper, { width: "25%" }]}
            >
              <View style={styles.menuBox}>
                <Icon
                  style={{ left: 3 }}
                  name="ellipsis-horizontal-outline"
                  size={40}
                  color="#3C486B"
                />
              </View>
              <Text style={styles.menuText}>Lainnya</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.beritaWrapper}>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <View style={{ flex: 1, marginBottom: 5 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#FFF",
                    marginTop: 10,
                  }}
                >
                  Berita Desa
                </Text>
              </View>
              <TouchableOpacity onPress={() => {}}>
                <Text
                  style={{
                    fontSize: 11,
                    color: "#FFF",
                    marginTop: 15,
                  }}
                >
                  View All
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.berita}>
              <View style={styles.beritaImgWrapper}>
                <Image
                  source={require("../../assets/one.jpeg")}
                  resizeMode="cover"
                  style={styles.beritaImg}
                />
              </View>
              <View style={styles.beritaInfo}>
                <Text style={styles.beritaTitle}>Desa Tanggap Bencana</Text>
                <Text style={styles.beritaDetails}>
                  Ahad, 04 April 2021 09:30
                </Text>
              </View>
            </View>
            <View style={styles.berita}>
              <View style={styles.beritaImgWrapper}>
                <Image
                  source={require("../../assets/one.jpeg")}
                  resizeMode="cover"
                  style={styles.beritaImg}
                />
              </View>
              <View style={styles.beritaInfo}>
                <Text style={styles.beritaTitle}>Perbaikan Gorong-gorong</Text>
                <Text style={styles.beritaDetails}>
                  Sabtu, 10 April 2021 16:30
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EE4A4A",
  },
  header: {
    backgroundColor: "white",
    height: 255,
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  headerImage: {
    height: "65%",
    width: dimensions.width * 1,
    alignSelf: "center",
  },
  headerText: {
    fontSize: 14,
    left: "6%",
    width: 345,
    lineHeight: 20,
    textAlign: "justify",
  },
  ketDetail: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ketText: {
    marginLeft: 24,
    marginRight: 24,
    marginTop: 10,
    fontSize: 11,
    color: "#777",
  },
  date: {
    flex: 1,
    ...Platform.select({
      ios: {
        position: "absolute",
        top: "56%",
        right: 27,
        width: "12%",
        height: 65,
        borderRadius: 10,
        backgroundColor: "#EE4A4A",
        opacity: 0.7,
      },
      android: {
        position: "absolute",
        top: "56%",
        right: 26,
        width: "11%",
        height: 65,
        borderRadius: 10,
        backgroundColor: "#EE4A4A",
        opacity: 0.7,
      },
    }),
  },
  dateText: {
    fontSize: 13,
    textAlign: "center",
    color: "#FFF",
    lineHeight: 20,
  },
  batalBtn: {
    width: "40%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff", //'#C98827',
    borderRadius: 10,
  },
  batalText: {
    color: "#3C486B",
    fontSize: 13,
    fontWeight: "bold",
    top: 4,
    left: 5,
  },
  menuContainer: {
    marginTop: 10,
    padding: 3,
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  menuWrapper: {
    marginVertical: 10,
    alignItems: "center",
  },
  menuBox: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 15,
  },
  menuText: {
    top: 5,
    alignSelf: "center",
    textAlign: "center",
    fontSize: 12,
    color: "#FFF",
  },
  beritaWrapper: {
    width: "90%",
    marginTop: 5,
    alignSelf: "center",
  },
  berita: {
    height: 100,
    marginVertical: 6,
    flexDirection: "row",
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 10,
  },
  beritaImgWrapper: {
    flex: 1,
  },
  beritaImg: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  beritaInfo: {
    flex: 2,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "#fff",
  },
  beritaTitle: {
    fontWeight: "bold",
    marginBottom: 3,
  },
  beritaDetails: {
    marginTop: 3,
    fontSize: 12,
    color: "#444",
  },
});
