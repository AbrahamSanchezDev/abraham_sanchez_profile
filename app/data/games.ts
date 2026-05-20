export interface GameProject {
  id: string;
  title: string;
  subtitle: string;
  techBadge: string;
  gifUrl: string;
  repoUrl: string;
  challenge: string;
  architecture: string;
  techStack: string[];
  codeSnippetTitle: string;
  codeSnippet: string;
}

export const arcadeGames: GameProject[] = [
  {
    id: "drift-shooter",
    title: "Drift Striker 2D",
    subtitle: "Arcade space shooter with momentum-based physics",
    techBadge: "Unity",
    gifUrl: "/games/drift-striker.gif",
    repoUrl: "https://github.com/abraham_sanchez_profile/drift-striker",
    challenge:
      "Implemented predictive collision detection and momentum-based movement to create satisfying drift mechanics, requiring optimized pooling for 300+ bullets per frame.",
    architecture:
      "Object pooling for bullets/enemies, State machine for player states, Observer pattern for score updates",
    techStack: ["C#", "Unity", "Physics2D", "UI Toolkit"],
    codeSnippetTitle: "Object Pooling - Efficient Bullet Management",
    codeSnippet: `public class BulletPool : MonoBehaviour {
  private Queue<Bullet> availableBullets = new();
  private List<Bullet> activeBullets = new();
  
  public void Initialize(int poolSize) {
    for (int i = 0; i < poolSize; i++) {
      var bullet = Instantiate(bulletPrefab);
      bullet.gameObject.SetActive(false);
      availableBullets.Enqueue(bullet);
    }
  }
  
  public Bullet Get(Vector2 position, Vector2 direction) {
    var bullet = availableBullets.Count > 0 
      ? availableBullets.Dequeue() 
      : Instantiate(bulletPrefab);
    
    bullet.Initialize(position, direction);
    bullet.gameObject.SetActive(true);
    activeBullets.Add(bullet);
    return bullet;
  }
  
  public void Return(Bullet bullet) {
    bullet.gameObject.SetActive(false);
    activeBullets.Remove(bullet);
    availableBullets.Enqueue(bullet);
  }
}`,
  },
  {
    id: "rhythm-pulse",
    title: "Rhythm Pulse",
    subtitle: "Beat-sync action game with precise timing mechanics",
    techBadge: "Three.js",
    gifUrl: "/games/rhythm-pulse.gif",
    repoUrl: "https://github.com/abraham_sanchez_profile/rhythm-pulse",
    challenge:
      "Synchronized audio playback with visual feedback within 16ms tolerance. Used WebAudio API for real-time BPM detection and frame-perfect input validation.",
    architecture:
      "Observer pattern for beat events, Singleton audio manager, Factory pattern for note generation",
    techStack: ["TypeScript", "Three.js", "WebAudio", "Vite"],
    codeSnippetTitle: "Observer Pattern - Event-Driven Beat System",
    codeSnippet: `interface BeatObserver {
  onBeat(beatData: BeatEvent): void;
}

class BeatManager {
  private observers: Set<BeatObserver> = new();
  private audioContext: AudioContext;
  private analyser: AnalyserNode;
  
  subscribe(observer: BeatObserver): void {
    this.observers.add(observer);
  }
  
  unsubscribe(observer: BeatObserver): void {
    this.observers.delete(observer);
  }
  
  private notifyBeat(beatData: BeatEvent): void {
    this.observers.forEach(observer => observer.onBeat(beatData));
  }
  
  detectBeat(): void {
    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(dataArray);
    
    const energy = dataArray.reduce((a, b) => a + b) / dataArray.length;
    if (energy > this.threshold) {
      this.notifyBeat({ energy, timestamp: performance.now() });
    }
  }
}`,
  },
  {
    id: "logic-maze",
    title: "Logic Maze Solver",
    subtitle: "Puzzle game with constraint satisfaction mechanics",
    techBadge: "Unity",
    gifUrl: "/games/logic-maze.gif",
    repoUrl: "https://github.com/abraham_sanchez_profile/logic-maze",
    challenge:
      "Implemented backtracking algorithm with constraint propagation for puzzle generation. Optimized memory usage for nested grid data structures using object reuse patterns.",
    architecture:
      "Model-View-Controller pattern, Dependency injection for puzzle generators, Strategy pattern for solving algorithms",
    techStack: ["C#", "Unity", "Algorithm Design", "Memory Optimization"],
    codeSnippetTitle: "Memory-Efficient Grid Management with Pooling",
    codeSnippet: `public class GridCellPool {
  private Stack<GridCell> pool = new();
  private List<GridCell> active = new();
  
  public GridCell[] CreateGrid(int width, int height) {
    var cells = new GridCell[width * height];
    for (int i = 0; i < cells.Length; i++) {
      cells[i] = Rent();
      cells[i].Initialize();
    }
    return cells;
  }
  
  private GridCell Rent() {
    return pool.Count > 0 ? pool.Pop() : new GridCell();
  }
  
  public void ReturnGrid(GridCell[] cells) {
    foreach (var cell in cells) {
      if (cell != null) {
        cell.Reset();
        pool.Push(cell);
      }
    }
  }
  
  public void Clear() {
    pool.Clear();
  }
}`,
  },
  {
    id: "pixel-platform",
    title: "Pixel Platform Quest",
    subtitle: "Minimalist platformer with tight controls and flow",
    techBadge: "Three.js",
    gifUrl: "/games/pixel-platform.gif",
    repoUrl: "https://github.com/abraham_sanchez_profile/pixel-platform",
    challenge:
      "Achieved frame-perfect input response (60fps @ 16.67ms) through input buffering and predictive frame skipping. Optimized rendering pipeline for 10K+ draw calls.",
    architecture:
      "Input system with buffering, Physics engine with lazy evaluation, Event-driven collision system",
    techStack: ["TypeScript", "Three.js", "Cannon Physics", "WebGL"],
    codeSnippetTitle: "Input Buffer System for Frame-Perfect Controls",
    codeSnippet: `class InputBuffer {
  private buffer: InputCommand[] = [];
  private maxBufferSize = 2;
  
  addInput(command: InputCommand): void {
    if (this.buffer.length < this.maxBufferSize) {
      this.buffer.push(command);
    }
  }
  
  execute(player: Player): void {
    while (this.buffer.length > 0) {
      const command = this.buffer.shift()!;
      this.executeCommand(player, command);
      
      if (player.state === 'jumping' && command.type !== 'jump') {
        this.buffer.unshift(command);
        break;
      }
    }
  }
  
  private executeCommand(player: Player, cmd: InputCommand): void {
    switch (cmd.type) {
      case 'move_left': player.velocity.x = -player.speed; break;
      case 'move_right': player.velocity.x = player.speed; break;
      case 'jump': if (player.isGrounded) player.jump(); break;
    }
  }
}`,
  },
];
