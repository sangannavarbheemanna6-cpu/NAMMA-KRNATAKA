import{useState,useEffect}from"react";
import{useNavigate}from"react-router-dom";
import{HiArrowLeft,HiAcademicCap,HiExternalLink,HiRefresh}from"react-icons/hi";

const FEEDS=[
  {
    id:"toi",
    en:"TOI Education",
    kn:"TOI ಶಿಕ್ಷಣ",
    url:"https://timesofindia.indiatimes.com/education"
  },
  {
    id:"hindu",
    en:"The Hindu Education",
    kn:"ದಿ ಹಿಂದೂ ಶಿಕ್ಷಣ",
    url:"https://www.thehindu.com/education/"
  }
];

const LINKS=[
  {
    id:"nsp",
    en:"National Scholarship Portal (NSP)",
    kn:"ರಾಷ್ಟ್ರೀಯ ವಿದ್ಯಾರ್ಥಿವೇತನ ಪೋರ್ಟಲ್ (NSP)",
    url:"https://scholarships.gov.in/"
  },
  {
    id:"ssp",
    en:"State Scholarship Portal (SSP)",
    kn:"ರಾಜ್ಯ ವಿದ್ಯಾರ್ಥಿವೇತನ ಪೋರ್ಟಲ್ (SSP)",
    url:"https://ssp.postmatric.karnataka.gov.in/"
  },
  {
    id:"digilocker",
    en:"DigiLocker",
    kn:"ಡಿಜಿಲಾಕರ್",
    url:"https://www.digilocker.gov.in/"
  },
  {
    id:"kseab",
    en:"Karnataka School Education",
    kn:"ಕರ್ನಾಟಕ ಶಾಲಾ ಶಿಕ್ಷಣ",
    url:"https://schooleducation.karnataka.gov.in/"
  },
  {
    id:"ugc",
    en:"UGC",
    kn:"UGC",
    url:"https://www.ugc.gov.in/"
  },
  {
    id:"ncert",
    en:"NCERT e-Pathshala",
    kn:"NCERT ಇ-ಪಾಠಶಾಲೆ",
    url:"https://epathshala.nic.in/"
  },
  {
    id:"swayam",
    en:"SWAYAM",
    kn:"SWAYAM ಆನ್‌ಲೈನ್ ಕೋರ್ಸ್‌ಗಳು",
    url:"https://swayam.gov.in/"
  },
  {
    id:"udise",
    en:"UDISE+ Know Your School",
    kn:"UDISE+ ನಿಮ್ಮ ಶಾಲೆಯನ್ನು ಹುಡುಕಿ",
    url:"https://kys.udiseplus.gov.in/"
  },
  {
    id:"aglasem",
    en:"AglaSem – NCERT Syllabus & Exam Question Papers",
    kn:"AglaSem – NCERT ಪಠ್ಯಕ್ರಮ ಮತ್ತು ಪರೀಕ್ಷಾ ಪ್ರಶ್ನೆಪತ್ರಿಕೆಗಳು",
    url:"https://aglasem.com/"
  }
];

const T={
  en:{
    title:"Education",
    subtitle:"Education services, portals, courses and latest updates",
    portals:"Education Portals",
    news:"Education News",
    latest:"Latest",
    refresh:"Refresh",
    loading:"Loading latest education news...",
    error:"Unable to load news right now.",
    retry:"Try Again",
    noNews:"No news available right now.",
    back:"Back"
  },
  kn:{
    title:"ಶಿಕ್ಷಣ",
    subtitle:"ಶಿಕ್ಷಣ ಸೇವೆಗಳು, ಪೋರ್ಟಲ್‌ಗಳು, ಕೋರ್ಸ್‌ಗಳು ಮತ್ತು ಇತ್ತೀಚಿನ ಮಾಹಿತಿಗಳು",
    portals:"ಶಿಕ್ಷಣ ಪೋರ್ಟಲ್‌ಗಳು",
    news:"ಶಿಕ್ಷಣ ಸುದ್ದಿ",
    latest:"ಇತ್ತೀಚಿನ",
    refresh:"ರಿಫ್ರೆಶ್",
    loading:"ಇತ್ತೀಚಿನ ಶಿಕ್ಷಣ ಸುದ್ದಿಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
    error:"ಈಗ ಸುದ್ದಿಗಳನ್ನು ಲೋಡ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗುತ್ತಿಲ್ಲ.",
    retry:"ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ",
    noNews:"ಈಗ ಯಾವುದೇ ಸುದ್ದಿ ಲಭ್ಯವಿಲ್ಲ.",
    back:"ಹಿಂದೆ"
  }
};

const timeAgo=(date,lang)=>{
  const time=new Date(date).getTime();

  if(!Number.isFinite(time)){
    return lang==="kn"?"ಇತ್ತೀಚಿನ":"Latest";
  }

  const diff=Math.floor((Date.now()-time)/1000);

  if(diff<60){
    return lang==="kn"?"ಈಗಷ್ಟೇ":"Just now";
  }

  const mins=Math.floor(diff/60);

  if(mins<60){
    return lang==="kn"
      ?`${mins} ನಿಮಿಷಗಳ ಹಿಂದೆ`
      :`${mins} min ago`;
  }

  const hours=Math.floor(mins/60);

  if(hours<24){
    return lang==="kn"
      ?`${hours} ಗಂಟೆಗಳ ಹಿಂದೆ`
      :`${hours} hr ago`;
  }

  const days=Math.floor(hours/24);

  return lang==="kn"
    ?`${days} ದಿನಗಳ ಹಿಂದೆ`
    :`${days} days ago`;
};

export default function Education(){

  const navigate=useNavigate();

  const[lang,setLang]=useState(
    localStorage.getItem("nk_lang")||"en"
  );

  const[feed,setFeed]=useState("toi");
  const[articles,setArticles]=useState([]);
  const[loading,setLoading]=useState(true);
  const[error,setError]=useState(false);

  const t=T[lang]||T.en;

  useEffect(()=>{
    const change=()=>{
      const savedLang=localStorage.getItem("nk_lang")||"en";
      setLang(T[savedLang]?savedLang:"en");
    };

    window.addEventListener("languagechange",change);

    return()=>{
      window.removeEventListener("languagechange",change);
    };
  },[]);

  useEffect(()=>{
    loadNews();
  },[feed]);

  const loadNews=async()=>{
    setLoading(true);
    setError(false);

    try{

      const selected=
        FEEDS.find(x=>x.id===feed)||FEEDS[0];

      const api=
        `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(selected.url)}`;

      const res=await fetch(api);

      if(!res.ok){
        throw new Error("Failed");
      }

      const data=await res.json();

      if(!data||data.status!=="ok"){
        throw new Error("Feed error");
      }

      const safeArticles=
        Array.isArray(data.items)
          ?data.items
            .filter(item=>item&&typeof item==="object")
            .filter(item=>item.title||item.link)
            .slice(0,20)
          :[];

      setArticles(safeArticles);

    }catch(e){

      console.error("Education news error:",e);

      setArticles([]);
      setError(true);

    }finally{

      setLoading(false);

    }
  };

  return(
    <div
      style={{
        minHeight:"100vh",
        background:"#f6f8fc",
        color:"#111827",
        paddingBottom:30
      }}
    >

      <div
        style={{
          position:"sticky",
          top:0,
          zIndex:20,
          background:"#fff",
          borderBottom:"1px solid #e5e7eb",
          padding:"14px 16px"
        }}
      >

        <div
          style={{
            maxWidth:900,
            margin:"0 auto",
            display:"flex",
            alignItems:"center",
            gap:12
          }}
        >

          <button
            onClick={()=>navigate(-1)}
            style={{
              border:0,
              background:"#eef2ff",
              width:42,
              height:42,
              borderRadius:12,
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              cursor:"pointer"
            }}
          >
            <HiArrowLeft size={22}/>
          </button>

          <div
            style={{
              width:44,
              height:44,
              borderRadius:13,
              background:"#1647b6",
              color:"#fff",
              display:"flex",
              alignItems:"center",
              justifyContent:"center"
            }}
          >
            <HiAcademicCap size={25}/>
          </div>

          <div style={{flex:1}}>

            <div
              style={{
                fontSize:20,
                fontWeight:800
              }}
            >
              {t.title}
            </div>

            <div
              style={{
                fontSize:12,
                color:"#6b7280",
                marginTop:2
              }}
            >
              {t.subtitle}
            </div>

          </div>

        </div>

      </div>

      <main
        style={{
          maxWidth:900,
          margin:"0 auto",
          padding:"18px 16px"
        }}
      >

        <section>

          <h2
            style={{
              fontSize:18,
              margin:"4px 0 12px",
              fontWeight:800
            }}
          >
            {t.portals}
          </h2>

          <div
            style={{
              display:"grid",
              gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
              gap:12
            }}
          >

            {LINKS.map(item=>(
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration:"none",
                  color:"inherit",
                  background:"#fff",
                  border:"1px solid #e5e7eb",
                  borderRadius:16,
                  padding:16,
                  display:"flex",
                  alignItems:"center",
                  gap:12,
                  boxShadow:"0 2px 8px rgba(0,0,0,.04)"
                }}
              >

                <div
                  style={{
                    width:42,
                    height:42,
                    borderRadius:12,
                    background:"#eef2ff",
                    color:"#1647b6",
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center",
                    flexShrink:0
                  }}
                >
                  <HiAcademicCap size={22}/>
                </div>

                <div style={{flex:1}}>

                  <div
                    style={{
                      fontSize:14,
                      fontWeight:750,
                      lineHeight:1.35
                    }}
                  >
                    {lang==="kn"?item.kn:item.en}
                  </div>

                </div>

                <HiExternalLink
                  size={18}
                  color="#6b7280"
                />

              </a>
            ))}

          </div>

        </section>

        <section style={{marginTop:28}}>

          <div
            style={{
              display:"flex",
              alignItems:"center",
              justifyContent:"space-between",
              gap:10,
              marginBottom:12
            }}
          >

            <h2
              style={{
                fontSize:18,
                margin:0,
                fontWeight:800
              }}
            >
              {t.news}
            </h2>

            <button
              onClick={loadNews}
              style={{
                border:"1px solid #dbe2ea",
                background:"#fff",
                borderRadius:10,
                padding:"8px 11px",
                display:"flex",
                alignItems:"center",
                gap:6,
                cursor:"pointer"
              }}
            >

              <HiRefresh size={17}/>

              <span
                style={{
                  fontSize:12,
                  fontWeight:700
                }}
              >
                {t.refresh}
              </span>

            </button>

          </div>

          <div
            style={{
              display:"flex",
              gap:8,
              overflowX:"auto",
              paddingBottom:8
            }}
          >

            {FEEDS.map(item=>(
              <button
                key={item.id}
                onClick={()=>setFeed(item.id)}
                style={{
                  border:"1px solid #dbe2ea",
                  background:feed===item.id?"#1647b6":"#fff",
                  color:feed===item.id?"#fff":"#374151",
                  borderRadius:10,
                  padding:"9px 13px",
                  whiteSpace:"nowrap",
                  cursor:"pointer",
                  fontWeight:700,
                  fontSize:13
                }}
              >
                {lang==="kn"?item.kn:item.en}
              </button>
            ))}

          </div>

          {loading&&(
            <div
              style={{
                background:"#fff",
                borderRadius:16,
                padding:25,
                textAlign:"center",
                color:"#6b7280",
                border:"1px solid #e5e7eb"
              }}
            >
              {t.loading}
            </div>
          )}

          {!loading&&error&&(
            <div
              style={{
                background:"#fff",
                borderRadius:16,
                padding:25,
                textAlign:"center",
                border:"1px solid #e5e7eb"
              }}
            >

              <div
                style={{
                  color:"#6b7280",
                  marginBottom:12
                }}
              >
                {t.error}
              </div>

              <button
                onClick={loadNews}
                style={{
                  border:0,
                  background:"#1647b6",
                  color:"#fff",
                  padding:"10px 16px",
                  borderRadius:10,
                  fontWeight:700,
                  cursor:"pointer"
                }}
              >
                {t.retry}
              </button>

            </div>
          )}

          {!loading&&!error&&articles.length===0&&(
            <div
              style={{
                background:"#fff",
                borderRadius:16,
                padding:25,
                textAlign:"center",
                color:"#6b7280",
                border:"1px solid #e5e7eb"
              }}
            >
              {t.noNews}
            </div>
          )}

          {!loading&&!error&&articles.length>0&&(
            <div
              style={{
                display:"grid",
                gap:12
              }}
            >

              {articles.map((article,index)=>{

                if(!article){
                  return null;
                }

                const title=
                  typeof article.title==="string"&&article.title.trim()
                    ?article.title
                    :t.latest;

                const link=
                  typeof article.link==="string"&&article.link.trim()
                    ?article.link
                    :"#";

                return(
                  <a
                    key={
                      article.guid||
                      article.link||
                      `education-news-${index}`
                    }
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration:"none",
                      color:"inherit",
                      background:"#fff",
                      border:"1px solid #e5e7eb",
                      borderRadius:16,
                      padding:16,
                      display:"block"
                    }}
                  >

                    <div
                      style={{
                        fontSize:15,
                        fontWeight:800,
                        lineHeight:1.4,
                        marginBottom:8
                      }}
                    >
                      {title}
                    </div>

                    <div
                      style={{
                        fontSize:12,
                        color:"#6b7280"
                      }}
                    >
                      {article.pubDate
                        ?timeAgo(article.pubDate,lang)
                        :t.latest}
                    </div>

                  </a>
                );

              })}

            </div>
          )}

        </section>

      </main>

    </div>
  );
}
