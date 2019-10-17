const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true,
});

const createScene = () => {
    const scene = new BABYLON.Scene(engine);

    const sizeMoon = 1737;
    const sizeMercury = 2439;
    const sizeMars = 3389;
    const sizeVenus = 6051;
    const sizeEarth = 6371;

    const base = 2;

    /* ----------- CAMERA ---------- */
    const camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, new BABYLON.Vector3(-50, 50, -50), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);

    /* ----------- LIGHTNING ---------- */
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.specular = new BABYLON.Color3(0,0,0);
    light.intensity = .7;

    /* ----------- MERCURY ---------- */
    const mercury = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: (sizeMercury / sizeMoon) * base, segments: 64 }, scene);
    mercury.position.x = 45;
    mercury.position.y = 0;

    const mercuryMaterial = new BABYLON.StandardMaterial("mercuryMaterial", scene);
    mercuryMaterial.diffuseTexture = new BABYLON.Texture("assets/mercury.jpg", scene);
    mercury.material = mercuryMaterial;

    /* ----------- MARS ---------- */
    const mars = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: (sizeMars / sizeMoon) * base, segments: 64 }, scene);
    mars.position.x = 30;
    mars.position.y = 0;

    const marsMaterial = new BABYLON.StandardMaterial("marsMaterial", scene);
    marsMaterial.diffuseTexture = new BABYLON.Texture("assets/mars.jpg", scene);
    mars.material = marsMaterial;

    /* ----------- VENUS ---------- */
    const venus = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: (sizeVenus / sizeMoon) * base, segments: 64 }, scene);
    venus.position.x = 15;
    venus.position.y = 0;

    const venusMaterial = new BABYLON.StandardMaterial("venusMaterial", scene);
    venusMaterial.diffuseTexture = new BABYLON.Texture("assets/venus.jpg", scene);
    venus.material = venusMaterial;

    /* ----------- EARTH ---------- */
    const earth = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: (sizeEarth / sizeMoon) * base, segments: 64 }, scene);
    earth.position.x = 0;
    earth.rotation.x = 380;
    earth.rotation.y = 0;

    const earthMaterial = new BABYLON.StandardMaterial("earthMaterial", scene);
    earthMaterial.diffuseTexture = new BABYLON.Texture("assets/earth.jpg", scene);
    earth.material = earthMaterial;

    /* ----------- MOON ---------- */
    const moon = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: base, segments: 64 }, scene);
    moon.position.x = -8;
    moon.position.y = 2;

    const moonMaterial = new BABYLON.StandardMaterial("moonMaterial", scene);
    moonMaterial.diffuseTexture = new BABYLON.Texture("assets/moon.jpg", scene);
    moon.material = moonMaterial;

    /* ----------- SKYBOX ---------- */
    const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 1000 }, scene);
    const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/skybox", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;
    skybox.infiniteDistance = true;

    return scene;
}

const scene = createScene();

engine.runRenderLoop(() => scene.render());
window.addEventListener("resize", () => engine.resize());
