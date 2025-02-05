import bg from "../../assets/images/background/Donasi.jpg"
import InfoDetail from "../../components/features/info-detail/InfoDetail";

const DonasiDetail = () => {
  const slideImages = [
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ]

  return (
    <div>

      <InfoDetail
        bg={bg} 
        h1={"salurkan aksi dengan cepat dan mudah"} 
        h2={"Kami pastikan segala bentuk bantuan akan tersalurkan dengan baik dan tepat sasaran."} 
        link_text={"DONASI SEKARANG"}
        title1={"apa aja sih konservasi yang didukung?"}
        title2={"kenapa harus konservasi dan rehabilitasi?"}
        title3={"apa yang harus kita lakukan dalam campaign ini?"}
        info1={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vitae tellus ante. Morbi sagittis, mauris vel accumsan hendrerit, nunc mauris gravida justo, at egestas justo sem sollicitudin mi. Nam a porta sapien. Etiam massa sem, auctor quis placerat id, finibus non odio. Ut blandit massa vitae eros sodales ultrices. Morbi id mattis mi. Vivamus porttitor turpis suscipit purus consequat ullamcorper vel eu tortor. Fusce risus nisl, suscipit sed viverra a, sollicitudin nec neque. Sed dui leo, posuere sit amet orci vitae, iaculis ultrices enim. Maecenas sit amet fringilla dolor. Etiam eget odio porta, accumsan erat hendrerit, viverra dolor. Cras eget augue eu erat pharetra iaculis eget quis magna. Nullam sit amet rhoncus elit. Vivamus nec efficitur tortor.Nullam et mauris id enim tempor maximus vitae at sem. In tempus hendrerit quam, condimentum lobortis ligula vulputate et. Nulla quis fringilla purus. In et massa in turpis gravida tincidunt sit amet at metus. Sed dapibus, nunc non eleifend feugiat, arcu mauris tempus sem, at lobortis dui eros sit amet enim. Vivamus sagittis, eros at rutrum sodales, odio lacus blandit leo, eu condimentum nibh metus ut metus. Vivamus a lorem in justo congue mollis. In viverra nec lectus non mattis. Integer pulvinar turpis augue, eget sagittis est consequat at. Proin blandit arcu a aliquet pretium. Donec tincidunt purus arcu, vitae vulputate sem imperdiet interdum. Fusce quis tincidunt nisi."}
        info2={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vitae tellus ante. Morbi sagittis, mauris vel accumsan hendrerit, nunc mauris gravida justo, at egestas justo sem sollicitudin mi. Nam a porta sapien. Etiam massa sem, auctor quis placerat id, finibus non odio. Ut blandit massa vitae eros sodales ultrices. Morbi id mattis mi. Vivamus porttitor turpis suscipit purus consequat ullamcorper vel eu tortor. Fusce risus nisl, suscipit sed viverra a, sollicitudin nec neque. Sed dui leo, posuere sit amet orci vitae, iaculis ultrices enim. Maecenas sit amet fringilla dolor. Etiam eget odio porta, accumsan erat hendrerit, viverra dolor. Cras eget augue eu erat pharetra iaculis eget quis magna. Nullam sit amet rhoncus elit. Vivamus nec efficitur tortor.Nullam et mauris id enim tempor maximus vitae at sem. In tempus hendrerit quam, condimentum lobortis ligula vulputate et. Nulla quis fringilla purus. In et massa in turpis gravida tincidunt sit amet at metus. Sed dapibus, nunc non eleifend feugiat, arcu mauris tempus sem, at lobortis dui eros sit amet enim. Vivamus sagittis, eros at rutrum sodales, odio lacus blandit leo, eu condimentum nibh metus ut metus. Vivamus a lorem in justo congue mollis. In viverra nec lectus non mattis. Integer pulvinar turpis augue, eget sagittis est consequat at. Proin blandit arcu a aliquet pretium. Donec tincidunt purus arcu, vitae vulputate sem imperdiet interdum. Fusce quis tincidunt nisi."}
        info3={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vitae tellus ante. Morbi sagittis, mauris vel accumsan hendrerit, nunc mauris gravida justo, at egestas justo sem sollicitudin mi. Nam a porta sapien. Etiam massa sem, auctor quis placerat id, finibus non odio. Ut blandit massa vitae eros sodales ultrices. Morbi id mattis mi. Vivamus porttitor turpis suscipit purus consequat ullamcorper vel eu tortor. Fusce risus nisl, suscipit sed viverra a, sollicitudin nec neque. Sed dui leo, posuere sit amet orci vitae, iaculis ultrices enim. Maecenas sit amet fringilla dolor. Etiam eget odio porta, accumsan erat hendrerit, viverra dolor. Cras eget augue eu erat pharetra iaculis eget quis magna. Nullam sit amet rhoncus elit. Vivamus nec efficitur tortor.Nullam et mauris id enim tempor maximus vitae at sem. In tempus hendrerit quam, condimentum lobortis ligula vulputate et. Nulla quis fringilla purus. In et massa in turpis gravida tincidunt sit amet at metus. Sed dapibus, nunc non eleifend feugiat, arcu mauris tempus sem, at lobortis dui eros sit amet enim. Vivamus sagittis, eros at rutrum sodales, odio lacus blandit leo, eu condimentum nibh metus ut metus. Vivamus a lorem in justo congue mollis. In viverra nec lectus non mattis. Integer pulvinar turpis augue, eget sagittis est consequat at. Proin blandit arcu a aliquet pretium. Donec tincidunt purus arcu, vitae vulputate sem imperdiet interdum. Fusce quis tincidunt nisi."}
        photos={slideImages}
      />

    </div>
  );
};

export default DonasiDetail;
