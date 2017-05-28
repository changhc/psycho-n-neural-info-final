import React, { Component } from 'react';
import Popup from './Popup';
import Sidebar from './Sidebar';
import style from './App.css';

const remoteUrl = 'http://localhost:5000';

class App extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      userId: '',
      type: -1,
      adNo: -1,
      showAd: false,
      time: -1,
    };
    this.fetchText = this.fetchText.bind(this);
    this.closeAd = this.closeAd.bind(this);
  }

  componentDidMount() {
    this.fetchText();
  }

  fetchText() {
    window.fetch(`${remoteUrl}/api/userId`, {
      method: 'GET',
      mode: 'cors',
      headers: { Accept: 'application/json' },
    }).then(res => res.json())
    .then((body) => {
      this.setState({ userId: body.userId, type: body.type, adNo: body.adNo });
      if (this.state.type === 0) {
        setTimeout(() => this.setState({
          showAd: true, time: Date.now(),
        }), (Math.random() * 1000) + 500);
      }
    })
    .catch((err) => {
      console.error(err);
    });
  }

  closeAd() {
    this.setState({ showAd: false, time: Date.now() - this.state.time });
  }

  render() {
    return (
      <div className={style.main}>
        {this.state.showAd ? <Popup adUrl={`${remoteUrl}/ad_${this.state.adNo}.jpg`} xUrl={`${remoteUrl}/Button.png`} close={this.closeAd} /> : null}
        {this.state.type === 1 ? <Sidebar adUrl={`${remoteUrl}/ad_side_${this.state.adNo}.jpg`} /> : null}
        <h1>小空間，大魔法 - 不可錯過的室內設計訣竅！</h1>
        <div className={style.time}>2017-05-25 14:38:38</div>
        <div className={`${style.content} ${this.state.type === 1 ? style.withSide : ''}`}>
          <p>
            要整頓並裝飾好客廳是件困難的工程，尤其是間小客廳時便更加困難。客廳通常是人們來家裡時聚在一起的地方，因此隨時讓客廳乾淨整潔並好好的裝飾，將會是個聰明的想法。雖然我們可能會受限於客廳不大的空間，但仍然有許多方法可以讓即使是很小的客廳，也能看起來舒適且寬敞。
          </p>
          <h3>清除雜物堆</h3>
          <p>
            根據室內設計師Lee Dobbins在Buzzle.com的文章，在佈置客廳時需要注意雜物堆的存在。因為雜物堆會使得客廳看起來比實際上還要來的小。好好的設計客廳使得雜物的問題消失，設計一個地方來放所有的雜物並且在用完東西後就把它收起來。
          </p>
          <h3>使用小傢俱</h3>
          <p>
            在布置小客廳時，使用小傢俱是很重要的。在購買家具前應該先考慮可以使用的空間。太多又大又笨重的東西會使得一個空間看起來比實際上還要小。使用較少及較小的傢俱會比較好。
          </p>
          <p>
            沙發需要選舒適的，因為它會是在客廳裡最常被使用的傢俱。如果還有空間的話，也可以再加上一兩張椅子。而和沙發椅相比，滑翔搖椅會占用更少的空間。
          </p>
          <p>
            客廳需要有個地方來擺放電視及其他電器，但要記得不要找太大的電器。在客廳裡擺一些架子，可以用來存放東西，也可以用來裝飾。另外，如果你想要在客廳擺一張咖啡桌，找一張附帶架子、抽屜、或是櫃子的咖啡桌來增加收納空間。這些東西可以把不重要的雜物從客人眼中藏起來。
          </p>
          <h3>謹慎地裝飾</h3>
          <p>
            你所選擇的裝飾品將會影響整個空間看起來是寬敞或是狹窄。在裝飾小空間時，油漆是一個很重要的要素。你想要讓一個空間看起來大而不悶，那麼就可以選擇明亮顏色的油漆。也可以使用第二種相稱顏色的油漆來修整整個空間。
          </p>
          <p>
            照明對一個小空間來說也是重要的一部份。許多家裡在客廳會有天花板吊燈，但那通常並不美觀、照明效果也不太好。改變吊燈的罩子來搭配你的裝飾，並且尋找高效節能的燈泡散發柔光照亮整個地方。同時也擺放一些檯燈或落地燈，燈泡的選擇與上述相同。
          </p>
          <p>
            讓牆上的物品數量不要超過太多也是件重要的事情。在沙發上方擺一張大大的圖片，和一些適當擺放及裱框的照片將會有不錯的效果。在咖啡桌上擺花，並在兩旁擺設蠟燭，可以將這個空間增添幾分優雅。在架子上擺幾本書會更有家的感覺。而擺放噴水裝飾品則可以讓環境感覺更加寧靜。
          </p>
        </div>
      </div>
    );
  }
}

export default App;
